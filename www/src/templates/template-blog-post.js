import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import rehypeReact from "rehype-react"
import ArrowForwardIcon from "react-icons/lib/md/arrow-forward"
import ArrowBackIcon from "react-icons/lib/md/arrow-back"
import Img from "gatsby-image"
import Layout from "../components/layout"
import presets, { colors, space, transition, radii } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import Container from "../components/container"
import DocSearchContent from "../components/docsearch-content"
import EmailCaptureForm from "../components/email-capture-form"
import TagsSection from "../components/tags-section"
import HubspotForm from "../components/hubspot-form"
import Pullquote from "../components/shared/pullquote"
import Chart from "../components/chart"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "hubspot-form": HubspotForm,
    "date-chart": Chart,
    pullquote: Pullquote,
  },
}).Compiler

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const prev = this.props.pageContext.prev
    const next = this.props.pageContext.next
    const prevNextLinkStyles = {
      "&&": {
        borderBottom: 0,
        fontFamily: options.headerFontFamily.join(`,`),
        fontWeight: `bold`,
        color: colors.gatsby,
      },
    }
    const prevNextLabelStyles = {
      marginTop: 0,
      marginBottom: 0,
      color: colors.gray.calm,
      fontWeight: `normal`,
      lineHeight: presets.lineHeights.solid,
    }
    const BioLine = ({ children }) => (
      <p
        css={{
          lineHeight: presets.lineHeights.dense,
          fontFamily: options.headerFontFamily.join(`,`),
          margin: 0,
          color: colors.gray.calm,
        }}
      >
        {children}
      </p>
    )
    let canonicalLink
    if (post.frontmatter.canonicalLink) {
      canonicalLink = (
        <link rel="canonical" href={post.frontmatter.canonicalLink} />
      )
    }

    return (
      <Layout location={this.props.location}>
        <Container>
          <DocSearchContent>
            {/* Add long list of social meta tags */}
            <Helmet>
              <title>{post.frontmatter.title}</title>
              <link
                rel="author"
                href={`https://gatsbyjs.org${
                  post.frontmatter.author.fields.slug
                }`}
              />
              <meta
                name="description"
                content={
                  post.frontmatter.excerpt
                    ? post.frontmatter.excerpt
                    : post.excerpt
                }
              />

              <meta property="og:description" content={post.excerpt} />
              <meta name="twitter:description" content={post.excerpt} />
              <meta property="og:title" content={post.frontmatter.title} />
              {post.frontmatter.image && (
                <meta
                  property="og:image"
                  content={`https://gatsbyjs.org${
                    post.frontmatter.image.childImageSharp.resize.src
                  }`}
                />
              )}
              {post.frontmatter.image && (
                <meta
                  name="twitter:image"
                  content={`https://gatsbyjs.org${
                    post.frontmatter.image.childImageSharp.resize.src
                  }`}
                />
              )}
              <meta property="og:type" content="article" />
              <meta
                name="article:author"
                content={post.frontmatter.author.id}
              />
              <meta
                name="twitter:creator"
                content={post.frontmatter.author.twitter}
              />
              <meta name="author" content={post.frontmatter.author.id} />
              <meta name="twitter:label1" content="Reading time" />
              <meta
                name="twitter:data1"
                content={`${post.timeToRead} min read`}
              />
              <meta
                name="article:published_time"
                content={post.frontmatter.rawDate}
              />
              {canonicalLink}
            </Helmet>
            <section
              css={{
                display: `flex`,
                marginBottom: rhythm(space[5]),
                [presets.Md]: {
                  marginTop: rhythm(space[3]),
                  marginBottom: rhythm(space[9]),
                },
              }}
            >
              <div
                css={{
                  flex: `0 0 auto`,
                }}
              >
                <Link
                  to={post.frontmatter.author.fields.slug}
                  css={{
                    "&&": {
                      borderBottom: 0,
                    },
                  }}
                >
                  <Img
                    fixed={post.frontmatter.author.avatar.childImageSharp.fixed}
                    css={{
                      height: rhythm(2.3),
                      width: rhythm(2.3),
                      margin: 0,
                      borderRadius: radii[6],
                      display: `inline-block`,
                      verticalAlign: `middle`,
                    }}
                  />
                </Link>
              </div>
              <div
                css={{
                  flex: `1 1 auto`,
                  marginLeft: rhythm(space[3]),
                }}
              >
                <Link to={post.frontmatter.author.fields.slug}>
                  <h4
                    css={{
                      fontSize: presets.scale[3],
                      marginBottom: rhythm(space[1]),
                      color: `${colors.gatsby}`,
                    }}
                  >
                    <span
                      css={{
                        borderBottom: `1px solid ${colors.ui.bright}`,
                        transition: `all ${transition.speed.fast} ${
                          transition.curve.default
                        }`,
                        "&:hover": {
                          background: colors.ui.bright,
                        },
                      }}
                    >
                      {post.frontmatter.author.id}
                    </span>
                  </h4>
                </Link>
                <BioLine>{post.frontmatter.author.bio}</BioLine>
                <BioLine>
                  {post.timeToRead} min read · {post.frontmatter.date}
                  {post.frontmatter.canonicalLink && (
                    <span>
                      {` `}
                      (originally published at
                      {` `}
                      <a href={post.frontmatter.canonicalLink}>
                        {this.props.data.markdownRemark.fields.publishedAt}
                      </a>
                      )
                    </span>
                  )}
                </BioLine>
              </div>
            </section>
            <h1
              css={{
                marginTop: 0,
                [presets.Lg]: {
                  marginBottom: rhythm(5 / 4),
                },
              }}
            >
              {this.props.data.markdownRemark.frontmatter.title}
            </h1>
            {post.frontmatter.image &&
              !(post.frontmatter.showImageInArticle === false) && (
                <div
                  css={{
                    marginBottom: rhythm(space[5]),
                  }}
                >
                  <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
                  {post.frontmatter.imageAuthor &&
                    post.frontmatter.imageAuthorLink && (
                      <em>
                        Image by
                        {` `}
                        <a href={post.frontmatter.imageAuthorLink}>
                          {post.frontmatter.imageAuthor}
                        </a>
                      </em>
                    )}
                </div>
              )}
            <section className="post-body">
              {renderAst(this.props.data.markdownRemark.htmlAst)}
            </section>
            <TagsSection
              tags={this.props.data.markdownRemark.frontmatter.tags}
            />
            <EmailCaptureForm />
          </DocSearchContent>
        </Container>
        <div
          css={{
            borderTop: `1px solid ${colors.ui.light}`,
            marginTop: rhythm(space[9]),
            [presets.Md]: {
              marginTop: rhythm(space[9]),
              paddingBottom: rhythm(space[5]),
              paddingTop: rhythm(space[5]),
            },
            [presets.Lg]: {
              marginTop: rhythm(3),
              paddingBottom: rhythm(space[9]),
              paddingTop: rhythm(space[9]),
            },
          }}
        >
          <Container>
            <div css={{ [presets.Sm]: { display: `flex`, width: `100%` } }}>
              <div
                css={{
                  [presets.Sm]: {
                    width: `50%`,
                  },
                }}
              >
                {prev && (
                  <Link to={prev.fields.slug} css={prevNextLinkStyles}>
                    <h4 css={prevNextLabelStyles}>Previous</h4>
                    <span
                      css={{
                        [presets.Md]: {
                          marginLeft: `-${rhythm(space[4])}`,
                        },
                      }}
                    >
                      <ArrowBackIcon style={{ verticalAlign: `sub` }} />
                      {prev.frontmatter.title}
                    </span>
                  </Link>
                )}
              </div>
              <div
                css={{
                  textAlign: `right`,
                  marginTop: rhythm(space[5]),
                  [presets.Sm]: { marginTop: 0, width: `50%` },
                }}
              >
                {next && (
                  <Link to={next.fields.slug} css={prevNextLinkStyles}>
                    <h4 css={prevNextLabelStyles}>Next</h4>
                    <span
                      css={{
                        [presets.Md]: { marginRight: `-${rhythm(space[4])}` },
                      }}
                    >
                      {next.frontmatter.title}
                      <ArrowForwardIcon style={{ verticalAlign: `sub` }} />
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      excerpt
      timeToRead
      fields {
        slug
        publishedAt
      }
      frontmatter {
        title
        excerpt
        date(formatString: "MMMM Do YYYY")
        rawDate: date
        canonicalLink
        tags
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageAuthor
        imageAuthorLink
        imageTitle
        showImageInArticle
        author {
          id
          bio
          twitter
          avatar {
            childImageSharp {
              fixed(
                width: 63
                height: 63
                quality: 75
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
          fields {
            slug
          }
        }
      }
    }
  }
`
