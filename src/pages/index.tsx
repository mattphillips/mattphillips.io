import React from 'react';
import { Link, graphql } from 'gatsby';

import SEO from '../components/seo';
import { AllPostsQuery } from '../../types/graphql-types';
import { RecursiveRequired } from '../types/gql';
import { Page } from '../components/Page';
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
      <div className="flex flex-row flex-wrap justify-center pb-16">
        {posts.map(
          ({
            node: {
              frontmatter: { date, description, image, imageDescription, title },
              fields: { slug }
            }
          }) => (
            <Link to={slug} className="mb-4">
              <article key={slug} className="rounded-lg shadow-lg h-full" style={{ maxWidth: 264, margin: 16 }}>
                <img src={image.publicURL} alt={imageDescription} className="rounded-t-xl block h-48 w-full" />
                <div className="p-4 text-gray-900">
                  <header>
                    <h4 className="mb-2">{title}</h4>
                    <small className="mb-4 text-xs text-gray-600 block">{date}</small>
                  </header>
                  <section>
                    <p dangerouslySetInnerHTML={{ __html: description }} />
                  </section>
                </div>
              </article>
            </Link>
          )
        )}
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
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            image {
              publicURL
            }
            imageDescription
          }
        }
      }
    }
  }
`;
