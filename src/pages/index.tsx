import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/seo';
import { AllPostsQuery } from '../../types/graphql-types';
import { RecursiveRequired } from '../types/gql';
import { Page } from '../components/Page';
import { PostMeta } from '../components/PostMeta';
import { Route } from '../Config';

type Props = { data: RecursiveRequired<AllPostsQuery> };

const Home = ({
  data: {
    allMarkdownRemark: { edges: posts }
  }
}: Props) => (
  <>
    {/* TODO: populate the SEO component with site metadata */}
    <SEO title="mattphillips.io" />

    <Page current={Route.HOME}>
      <div className="flex flex-row flex-wrap justify-center">
        {posts.map(({ node: { frontmatter: { date, description, image, title }, fields: { slug }, timeToRead } }) => (
          <Link to={slug} className="m-4" key={slug}>
            <article key={slug} className="rounded-lg shadow-lg h-full" style={{ width: 264 }}>
              <Img fluid={image.src.childImageSharp.fluid} alt={image.alt} className="rounded-t-xl h-48" />
              <div className="p-4 text-gray-900">
                <header className="mb-4">
                  <h4 className="mb-2">{title}</h4>
                  <PostMeta date={date} timeToRead={timeToRead} />
                </header>
                <section>
                  <p dangerouslySetInnerHTML={{ __html: description }} />
                </section>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </Page>
  </>
);

export default Home;

export const pageQuery = graphql`
  query AllPosts {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            image {
              alt
              src {
                childImageSharp {
                  fluid(maxWidth: 264, traceSVG: {color: "hsl(250, 88%, 60%)"}) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
