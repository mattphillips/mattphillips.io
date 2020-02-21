module.exports = {
  siteMetadata: {
    title: 'Matt Phillips',
    description: `TBD.`,
    author: `Matt Phillips`,
    social: {
      github: {
        handle: 'mattphillips',
        url: 'https://github.com/mattphillips'
      },
      twitter: {
        handle: 'mattphillipsio',
        url: 'https://twitter.com/mattphillipsio'
      }
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: `blog`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/profile.jpg` // This path is relative to the root of the site. // TODO: set an actual icon here
      }
    },
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `types/graphql-types.ts`,
        documentPaths: ['./src/**/*.{ts,tsx}', './node_modules/gatsby-*/**/*.js'],
        codegenDelay: 200
      }
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require(`tailwindcss`)(`./tailwind.config.js`), require(`autoprefixer`), require(`cssnano`)]
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/styles/global.css`]
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // TODO: decide on this size
              maxWidth: 728
            }
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
