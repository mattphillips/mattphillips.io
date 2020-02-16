import React from 'react';
import { graphql } from 'gatsby';
import SEO from './seo';
import styles from './post.module.css';

import { BlogPostBySlugQuery } from '../../types/graphql-types';
import { Back } from './icons/Back';
import { Bookmark } from './icons/Bookmark';
import { RecursiveRequired } from '../types/gql';
import { PostMeta } from './PostMeta';
import { Link } from './Link';
import { Route } from '../Config';

type Post = { data: RecursiveRequired<BlogPostBySlugQuery> };

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
            <div className="p-4 sticky top-0 bg-white sm:rounded-none rounded-t-xxl flex flex-row justify-between z-30">
              <Link className="p-2" to={Route.HOME}>
                <Back />
              </Link>
            </div>

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
