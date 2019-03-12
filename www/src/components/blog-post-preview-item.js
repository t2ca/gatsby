import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import { rhythm, options } from "../utils/typography"
import { colors, space, radii } from "../utils/presets"

const BlogPostPreviewItem = ({ post, className }) => (
  <article className={className} css={{ position: `relative` }}>
    <Link to={post.fields.slug} css={{ "&&": { color: colors.gray.copy } }}>
      <h2 css={{ marginTop: 0 }}>{post.frontmatter.title}</h2>
      <p>
        {post.frontmatter.excerpt ? post.frontmatter.excerpt : post.excerpt}
      </p>
    </Link>
    <div
      css={{
        display: `flex`,
        alignItems: `center`,
      }}
    >
      <Link
        to={post.frontmatter.author.fields.slug}
        css={{
          position: `relative`,
          zIndex: 1,
          "&&": { borderBottom: `0` },
        }}
      >
        <Img
          alt=""
          fixed={post.frontmatter.author.avatar.childImageSharp.fixed}
          css={{
            borderRadius: radii[6],
            display: `inline-block`,
            marginRight: rhythm(space[3]),
            marginBottom: 0,
            verticalAlign: `top`,
            // prevents image twitch in Chrome when hovering the card
            transform: `translateZ(0)`,
          }}
        />
      </Link>
      <div
        css={{
          display: `inline-block`,
          fontFamily: options.headerFontFamily.join(`,`),
          color: colors.gray.calm,
        }}
      >
        <div>
          <Link
            to={post.frontmatter.author.fields.slug}
            css={{
              position: `relative`,
              zIndex: 1,
              "&&": { color: colors.gatsby },
            }}
          >
            {post.frontmatter.author.id}
          </Link>
          {` `}
          on
          {` `}
          {post.frontmatter.date}
        </div>
      </div>
    </div>
    <Link
      to={post.fields.slug}
      css={{
        position: `absolute`,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: `hidden`,
        textIndent: `-100%`,
        whiteSpace: `nowrap`,
        zIndex: 0,
        "&&": { border: 0 },
      }}
    >
      Read more
    </Link>
  </article>
)

export const blogPostPreviewFragment = graphql`
  fragment BlogPostPreview_item on MarkdownRemark {
    excerpt
    fields {
      slug
    }
    frontmatter {
      excerpt
      title
      date(formatString: "MMMM Do YYYY")
      author {
        id
        fields {
          slug
        }
        avatar {
          childImageSharp {
            fixed(
              width: 30
              height: 30
              quality: 80
              traceSVG: {
                turdSize: 10
                background: "#f6f2f8"
                color: "#e0d6eb"
              }
            ) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default BlogPostPreviewItem
