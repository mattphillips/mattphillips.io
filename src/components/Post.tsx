import React from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';

import SEO from './seo';
import styles from './post.module.css';

import { BlogPostBySlugQuery } from '../../types/graphql-types';
import { Back } from './icons/Back';
import { RecursiveRequired } from '../types/gql';
import { PostMeta } from './PostMeta';
import { Link } from './Link';
import { Route } from '../Config';
import pic from '../images/profile.png';
import { Github } from './icons/Github';
import { LinkedIn } from './icons/LinkedIn';
import { Twitter } from './icons/Twitter';

type Article = { fields: { slug: string }; frontmatter: { title: string } };

type Post = {
  data: RecursiveRequired<BlogPostBySlugQuery>;
  pageContext: {
    next?: Article;
    previous?: Article;
    slug: string;
  };
};

const Header = ({ image, title }: { title: string; image: { src: FixedObject; alt: string } }) => {
  const [isSticky, setIsSticky] = React.useState(false);
  const ref = React.createRef<HTMLDivElement>();

  // mount
  React.useEffect(() => {
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(([e]) => setIsSticky(e.intersectionRatio < 1), { threshold: [1] });

    observer.observe(cachedRef!);

    // unmount
    return () => {
      observer.unobserve(cachedRef!);
    };
  }, []);

  const styles = isSticky ? 'rounded-none shadow-lg' : 'sm:rounded-none rounded-t-xxl';

  return (
    <div
      className={`${styles} p-4 sticky bg-white flex flex-row items-center z-30 w-full`}
      style={{ top: -1 }}
      ref={ref}
    >
      <Link className="p-2" to={Route.HOME}>
        <Back />
      </Link>
      {isSticky && (
        <span className="min-w-8 w-8 h-8 mr-2">
          <Img fixed={image.src} alt={image.alt} className="rounded-md" />
        </span>
      )}
      {isSticky && <h6 className="mb-0 truncate">{title}</h6>}
    </div>
  );
};

/*
.image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 30vh;
  left: 50%;
  transform: translateX(-50%);
}
*/

export default ({
  data: {
    site: {
      siteMetadata: {
        url,
        repo,
        social: {
          github: { url: github },
          twitter: { url: twitter },
          linkedIn: { url: linkedIn }
        }
      }
    },
    markdownRemark: { frontmatter, html, timeToRead }
  },
  pageContext: { next, previous, slug }
}: Post) => (
  <main>
    <SEO title={frontmatter.title} description={frontmatter.description} />
    <article className="w-full max-w-2xl mx-auto relative">
      <Img
        style={{ height: '30vh', top: 0, position: 'fixed' }}
        fluid={frontmatter.image.src.childImageSharp.banner}
        className="max-w-2xl w-full m-0 block"
      />

      <div className={`h-screen absolute top-0 left-0 right-0 bottom-0 ${styles.content}`}>
        <div className="sm:rounded-t-none rounded-t-xxl bg-white -mt-8">
          {frontmatter.image.credit && (
            <div className="text-center pt-3 text-sm text-gray-700">
              Photo by{' '}
              <a className="font-semibold" href={frontmatter.image.credit.url}>
                {frontmatter.image.credit.name}
              </a>
            </div>
          )}
          <Header
            image={{ src: frontmatter.image.src.childImageSharp.thumb, alt: frontmatter.image.alt }}
            title={frontmatter.title}
          />
          <div className="px-6">
            <header className="mb-6">
              <h1 className="leading-tight mb-2">{frontmatter.title}</h1>
              <PostMeta date={frontmatter.date} timeToRead={timeToRead} />
            </header>
            <section className={styles.post} dangerouslySetInnerHTML={{ __html: html }} />
            <footer className="py-8">
              <p>
                <ExternalLink href={`https://mobile.twitter.com/search?q=${encodeURIComponent(url + slug)}`}>
                  Discuss on Twitter
                </ExternalLink>
                <span className="text-2xl"> • </span>
                <ExternalLink href={`${repo}/edit/master/src/posts/${slug.replace(/\//g, '')}/index.md`}>
                  Edit on GitHub
                </ExternalLink>
              </p>
              <hr />
              <div className="flex flex-row items-start md:items-center mb-4">
                <img className="rounded-full h-24 mr-4" src={pic} alt="Matt Phillips" />
                <p>
                  Hey I'm Matt 👋, well done for reading this far down the page. If you feel some type of way about what
                  I've written above, I'd love to hear from you — hit me up on{' '}
                  <ExternalLink href={twitter}>Twitter</ExternalLink>.
                </p>
              </div>

              <hr />

              <nav>
                <ul className="flex">
                  <li className="flex-1 pr-4">
                    {previous && (
                      <GatsbyLink className="font-semibold underline" to={previous.fields.slug} rel="prev">
                        ← {previous.frontmatter.title}
                      </GatsbyLink>
                    )}
                  </li>
                  <li className="flex-1">
                    {next && (
                      <GatsbyLink className="font-semibold underline" to={next.fields.slug} rel="next">
                        {next.frontmatter.title} →
                      </GatsbyLink>
                    )}
                  </li>
                </ul>
              </nav>
            </footer>
          </div>
          <div className="flex justify-center bg-purple-500 w-full p-2 pb-6">
            <ExternalLink href={github}>
              <span className="flex items-center justify-center text-purple-100 h-10 w-10 hover:text-purple-300">
                <Github />
              </span>
            </ExternalLink>
            <ExternalLink className="ml-4" href={twitter}>
              <span className="flex items-center justify-center text-purple-100 h-10 w-10 hover:text-purple-300">
                <Twitter />
              </span>
            </ExternalLink>
            <ExternalLink className="ml-4" href={linkedIn}>
              <span className="flex items-center justify-center text-purple-100 h-10 w-10 hover:text-purple-300">
                <LinkedIn />
              </span>
            </ExternalLink>
          </div>
        </div>
      </div>
    </article>
  </main>
);

// TODO: pull this out and restrict the routes
const ExternalLink = ({
  className = '',
  children,
  href
}: {
  className?: string;
  children: React.ReactNode;
  href: string;
}) => (
  <a
    className={`${className} font-semibold text-base text-purple-500 hover:text-purple-300`}
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>
);

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        url
        repo
        social {
          github {
            url
          }
          twitter {
            url
          }
          linkedIn {
            url
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        description
        image {
          alt
          credit {
            name
            url
          }
          src {
            childImageSharp {
              thumb: fixed(width: 32, height: 32, traceSVG: { color: "hsl(250, 88%, 60%)" }) {
                ...GatsbyImageSharpFixed_tracedSVG
              }
              banner: fluid(maxWidth: 672, traceSVG: { color: "hsl(250, 88%, 60%)" }) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
