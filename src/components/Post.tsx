import React from 'react';
import { graphql } from 'gatsby';
import SEO from './seo';
import styles from './post.module.css';

import { BlogPostBySlugQuery } from '../../types/graphql-types';
import { Back } from './icons/Back';
import { RecursiveRequired } from '../types/gql';
import { PostMeta } from './PostMeta';
import { Link } from './Link';
import { Route } from '../Config';

type Post = { data: RecursiveRequired<BlogPostBySlugQuery> };

const Header = ({ title}: { title: string }) => {
  const [isSticky, setIsSticky] = React.useState(false)
  const ref = React.createRef<HTMLDivElement>()
  
  // mount 
  React.useEffect(()=>{
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      {threshold: [1]}
    )

    observer.observe(cachedRef!)
    
    // unmount
    return () => {
      observer.unobserve(cachedRef!)
    }
  }, [])

  const styles = isSticky ? 'rounded-none shadow-lg' : 'sm:rounded-none rounded-t-xxl';
  
  return (
    <div className={`${styles} p-4 sticky bg-white flex flex-row items-center z-30 w-full`} style={{top: -1}} ref={ref}>
      <Link className="p-2" to={Route.HOME}>
        <Back />
      </Link>
        {isSticky && <h6 className="mb-0 truncate" >{title}</h6>}
    </div>
  )
}


export default ({
  data: {
    markdownRemark: { frontmatter, html, timeToRead }
  }
}: Post) => {
  return (
    <main>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <article className="w-full max-w-2xl mx-auto relative">
        <img className={`max-w-2xl w-full m-0 block top-0 fixed ${styles.image}`} src={frontmatter.image.publicURL} />

        <div className={`h-screen absolute top-0 left-0 right-0 bottom-0 ${styles.content}`}>
          <div className="sm:rounded-t-none rounded-t-xxl bg-white -mt-8">
            <Header title={frontmatter.title} />
            <div className="px-6 pb-6">
              <header className="mb-6">
                <h1 className="leading-tight mb-2">{frontmatter.title}</h1>
                <PostMeta date={frontmatter.date} timeToRead={timeToRead} />
              </header>
              <section className={styles.post} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        description
        image {
          publicURL
        }
      }
    }
  }
`;
