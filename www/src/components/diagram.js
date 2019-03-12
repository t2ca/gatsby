import React, { Fragment } from "react"
import { keyframes } from "@emotion/core"
import { Link, StaticQuery, graphql } from "gatsby"

import { rhythm, options } from "../utils/typography"
import presets, { colors, space, radii } from "../utils/presets"
import logo from "../monogram.svg"
import { GraphQLIcon, ReactJSIcon } from "../assets/logos"
import FuturaParagraph from "../components/futura-paragraph"
import TechWithIcon from "../components/tech-with-icon"

const stripeColor = `255, 255, 255, 0.9`
const stripeSize = 15
const stripeAnimation = keyframes({
  "0%": {
    backgroundPosition: `${rhythm(stripeSize)} ${rhythm(stripeSize * 2)}`,
  },
  "100%": { backgroundPosition: `0 0` },
})
const stripeBg = {
  backgroundColor: colors.ui.whisper,
  backgroundSize: `${rhythm(stripeSize)} ${rhythm(stripeSize)}`,
  backgroundImage: `linear-gradient(45deg, rgba(${stripeColor}) 25%, transparent 25%, transparent 50%, rgba(${stripeColor}) 50%, rgba(${stripeColor}) 75%, transparent 75%, transparent)`,
  animation: `${stripeAnimation} 14s linear infinite`,
}
const lineAnimation = keyframes({
  to: { strokeDashoffset: 10 },
})

const Segment = ({ className, children }) => (
  <div
    className={`Segment ${className}`}
    css={{
      maxWidth: rhythm(32),
      margin: `0 auto`,
      textAlign: `center`,
    }}
  >
    {children}
  </div>
)

const SegmentTitle = ({ children }) => (
  <h2
    className="Segment-title"
    css={{
      display: `inline`,
      background: colors.accent,
      color: colors.gray.copy,
      borderRadius: radii[1],
      margin: `0 auto`,
      position: `relative`,
      bottom: `-${rhythm(space[2])}`,
      padding: `${rhythm(space[2])} ${rhythm(space[3])}`,
      fontWeight: `normal`,
      letterSpacing: presets.letterSpacings.tracked,
      fontSize: presets.scale[1],
      lineHeight: presets.lineHeights.solid,
      textTransform: `uppercase`,
      transform: `translateZ(0)`,
    }}
  >
    {children}
  </h2>
)

const VerticalLine = () => (
  <svg
    width="20"
    height="30"
    viewBox="0 0 20 30"
    css={{ margin: `0 auto`, display: `block` }}
  >
    <path
      d="M10 40 L10 -10"
      css={{
        stroke: colors.lilac,
        strokeWidth: `3`,
        strokeLinecap: `round`,
        strokeDasharray: `0.5 10`,
        animation: `${lineAnimation} 400ms linear infinite`,
      }}
    />
  </svg>
)

const box = {
  background: colors.white,
  border: `1px solid ${colors.ui.light}`,
  borderRadius: radii[2],
  padding: `${rhythm(space[5])} ${rhythm(space[7])} 0`,
}

const borderAndBoxShadow = {
  background: colors.white,
  border: `1px solid ${colors.ui.light}`,
  borderRadius: radii[1],
  boxShadow: presets.shadows.card,
  transform: `translateZ(0)`,
  width: `100%`,
}

const SourceItems = ({ children }) => (
  <div
    css={{
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `center`,
      ...box,
    }}
  >
    {children}
  </div>
)

const boxPadding = { padding: `${rhythm(space[3])} ${rhythm(space[4])}` }

const SourceItem = ({ children }) => (
  <div
    css={{
      boxSizing: `border-box`,
      padding: `0 ${rhythm(space[4])} ${rhythm(space[5])}`,
      display: `flex`,
      [presets.Xs]: {
        flex: `1 1 50%`,
      },
      [presets.Sm]: {
        flex: `1 1 33%`,
        maxWidth: `33%`,
      },
    }}
  >
    <div
      css={{
        ...borderAndBoxShadow,
        ...boxPadding,
        lineHeight: presets.lineHeights.dense,
        textAlign: `left`,
      }}
    >
      {children}
    </div>
  </div>
)

const ItemTitle = ({ children }) => (
  <h3
    css={{
      color: colors.gray.dark,
      margin: 0,
      fontStyle: `normal`,
      fontSize: presets.scale[2],
    }}
  >
    {children}
  </h3>
)

const ItemDescription = ({ children }) => (
  <small
    css={{
      lineHeight: presets.lineHeights.dense,
      display: `block`,
      color: colors.gray.calm,
      fontSize: presets.scale[1],
      fontFamily: options.systemFontFamily.join(`,`),
    }}
  >
    {children}
  </small>
)

const ItemDescriptionLink = ({ to, children }) => (
  <Link to={to}>{children}</Link>
)

const Gatsby = () => (
  <div
    css={{
      ...borderAndBoxShadow,
      padding: rhythm(space[5]),
      margin: `0 auto`,
      width: rhythm(5.5),
      height: rhythm(5.5),
      [presets.Lg]: {
        width: rhythm(6),
        height: rhythm(6),
      },
    }}
  >
    <img
      src={logo}
      css={{
        display: `inline-block`,
        height: rhythm(space[8]),
        margin: 0,
        verticalAlign: `middle`,
        width: `auto`,
        [presets.Lg]: {
          height: rhythm(space[9]),
        },
      }}
      alt="Gatsby"
    />
    <ItemDescription>
      <small
        css={{
          marginTop: rhythm(space[1]),
          display: `block`,
        }}
      >
        powered by
      </small>
      <span css={{ color: colors.gatsby }}>
        <TechWithIcon icon={GraphQLIcon}>GraphQL</TechWithIcon>
      </span>
    </ItemDescription>
  </div>
)

const Diagram = () => (
  <StaticQuery
    query={graphql`
      query StaticHostsQuery {
        allStaticHostsYaml {
          edges {
            node {
              title
              url
            }
          }
        }
      }
    `}
    render={({ allStaticHostsYaml: { edges: staticHosts } }) => (
      <section
        className="Diagram"
        css={{
          fontFamily: options.headerFontFamily.join(`,`),
          padding: rhythm(space[6]),
          textAlign: `center`,
          flex: `1 1 100%`,
        }}
      >
        <h1
          css={{
            marginTop: 0,
            marginBottom: rhythm(space[6]),
            [presets.Md]: {
              marginTop: rhythm(space[6]),
            },
          }}
        >
          How Gatsby works
        </h1>
        <div
          css={{ maxWidth: rhythm(20), margin: `0 auto ${rhythm(space[9])}` }}
        >
          <FuturaParagraph>
            Pull data from <em>anywhere</em>
          </FuturaParagraph>
        </div>

        <Segment className="Source">
          <SegmentTitle>Data Sources</SegmentTitle>
          <SourceItems>
            <SourceItem>
              <ItemTitle>CMSs</ItemTitle>
              <ItemDescription>
                Contentful, Drupal, WordPress, etc.
              </ItemDescription>
            </SourceItem>
            <SourceItem>
              <ItemTitle>Markdown</ItemTitle>
              <ItemDescription>Documentation, Posts, etc.</ItemDescription>
            </SourceItem>
            <SourceItem>
              <ItemTitle>Data</ItemTitle>
              <ItemDescription>
                APIs, Databases, YAML, JSON, CSV, etc.
              </ItemDescription>
            </SourceItem>
          </SourceItems>
        </Segment>

        <Segment className="Build">
          <VerticalLine />
          <SegmentTitle>Build</SegmentTitle>
          <div
            css={{
              ...box,
              ...stripeBg,
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <VerticalLine />
            <Gatsby />
            <VerticalLine />
            <div
              css={{
                ...borderAndBoxShadow,
                ...boxPadding,
                paddingTop: rhythm(space[3]),
                paddingBottom: rhythm(space[3]),
                width: `auto`,
                display: `inline-block`,
              }}
            >
              <ItemDescription>
                HTML &middot; CSS &middot;
                {` `}
                <TechWithIcon icon={ReactJSIcon} height="1.1em">
                  React
                </TechWithIcon>
              </ItemDescription>
            </div>
            <VerticalLine />
          </div>
        </Segment>

        <Segment className="Deploy">
          <VerticalLine />
          <SegmentTitle>Deploy</SegmentTitle>
          <div
            css={{
              ...box,
              paddingBottom: rhythm(space[5]),
            }}
          >
            <ItemTitle>Static Web Host</ItemTitle>
            <ItemDescription>
              {staticHosts.map(({ node: staticHost }, index) => (
                <Fragment key={staticHost.url}>
                  {index > 0 && `, `}
                  <ItemDescriptionLink to={staticHost.url}>
                    {staticHost.title}
                  </ItemDescriptionLink>
                </Fragment>
              ))}
              {` `}& many more
            </ItemDescription>
          </div>
        </Segment>
      </section>
    )}
  />
)

export default Diagram
