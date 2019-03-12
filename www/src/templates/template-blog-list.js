import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import TagsIcon from "react-icons/lib/ti/tags"

import Layout from "../components/layout"
import Button from "../components/button"
import Container from "../components/container"
import BlogPostPreviewItem from "../components/blog-post-preview-item"
import Pagination from "../components/pagination"
import EmailCaptureForm from "../components/email-capture-form"

import presets, { colors, space, transition, radii } from "../utils/presets"
import { rhythm, options } from "../utils/typography"

class BlogPostsIndex extends React.Component {
  render() {
    const { allMarkdownRemark } = this.props.data

    return (
      <Layout location={this.props.location}>
        <main
          id={`reach-skip-nav`}
          css={{
            [presets.Md]: {
              background: colors.ui.whisper,
              paddingBottom: rhythm(options.blockMarginBottom * 4),
            },
          }}
        >
          <Helmet>
            <title>Blog</title>
          </Helmet>
          <Container>
            <h1
              css={{
                marginTop: 0,
                [presets.Md]: {
                  marginTop: 0,
                  position: `absolute`,
                  width: 1,
                  height: 1,
                  padding: 0,
                  overflow: `hidden`,
                  clip: `rect(0,0,0,0)`,
                  whiteSpace: `nowrap`,
                  clipPath: `inset(50%)`,
                },
              }}
            >
              Blog
            </h1>
            {allMarkdownRemark.edges.map(({ node }) => (
              <BlogPostPreviewItem
                post={node}
                key={node.fields.slug}
                css={{
                  marginBottom: rhythm(space[6]),
                  [presets.Md]: {
                    boxShadow: presets.shadows.card,
                    background: colors.white,
                    borderRadius: radii[2],
                    padding: rhythm(space[9]),
                    paddingLeft: rhythm(space[9]),
                    paddingRight: rhythm(space[9]),
                    marginLeft: rhythm(-space[9]),
                    marginRight: rhythm(-space[9]),
                    transition: `transform ${transition.speed.default} ${
                      transition.curve.default
                    },  box-shadow ${transition.speed.default} ${
                      transition.curve.default
                    }, padding ${transition.speed.default} ${
                      transition.curve.default
                    }`,
                    "&:hover": {
                      transform: `translateY(-4px)`,
                      boxShadow: presets.shadows.cardHover,
                    },
                    "&:active": {
                      boxShadow: presets.shadows.cardActive,
                      transform: `translateY(0)`,
                    },
                  },
                }}
              />
            ))}
            <Pagination context={this.props.pageContext} />
            <div
              css={{
                display: `flex`,
                flexFlow: `row nowrap`,
                width: `100%`,
                justifyContent: `flex-end`,
              }}
            >
              <Button key="blog-view-all-tags-button" to="/blog/tags" small>
                View All Tags <TagsIcon />
              </Button>
            </div>
            <EmailCaptureForm signupMessage="Enjoying our blog? Receive the next post in your inbox!" />
          </Container>
        </main>
      </Layout>
    )
  }
}

export default BlogPostsIndex

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, fields___slug] }
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/docs.blog/" }
        fields: { released: { eq: true } }
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...BlogPostPreview_item
        }
      }
    }
  }
`
