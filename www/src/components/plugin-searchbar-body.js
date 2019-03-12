import React, { Component } from "react"
import {
  InstantSearch,
  Configure,
  SearchBox,
  Stats,
  RefinementList,
  InfiniteHits,
  Toggle,
} from "react-instantsearch/dom"
import { navigate as reachNavigate } from "@reach/router"
import { Link } from "gatsby"
import DownloadArrow from "react-icons/lib/md/file-download"
import AlgoliaLogo from "../assets/algolia.svg"
import GatsbyIcon from "../monogram.svg"
import debounce from "lodash/debounce"
import unescape from "lodash/unescape"

import presets, { space, colors, transition, radii } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import { scrollbarStyles, skipLink } from "../utils/styles"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import removeMD from "remove-markdown"
import VisuallyHidden from "@reach/visually-hidden"
import { SkipNavLink } from "@reach/skip-nav"

// This is for the urlSync
const updateAfter = 700

// A couple constants for CSS
const searchInputHeight = rhythm(7 / 4)
const searchMetaHeight = rhythm(8 / 4)
const searchInputWrapperMargin = rhythm(space[6])

/* stylelint-disable */
const searchBoxStyles = css`
  .ais-SearchBox__input:valid ~ .ais-SearchBox__reset {
    display: block;
  }

  .ais-SearchBox__root {
    display: inline-block;
    position: relative;
    margin: 0;
    width: 100%;
    height: auto;
    white-space: nowrap;
    box-sizing: border-box;
  }

  .ais-SearchBox__wrapper {
    height: calc(${searchInputHeight} + ${searchInputWrapperMargin});
    display: flex;
    align-items: flex-end;
  }

  .ais-SearchBox__input {
    -webkit-appearance: none;
    background: ${colors.white};
    border: 1px solid ${colors.ui.bright};
    border-radius: ${radii[2]}px;
    color: ${colors.gatsby};
    display: inline-block;
    font-size: ${presets.scale[3]};
    font-family: ${options.headerFontFamily.join(`,`)};
    height: ${searchInputHeight};
    padding: 0;
    padding-right: ${searchInputHeight};
    padding-left: ${searchInputHeight};
    margin: 0 ${searchInputWrapperMargin};
    transition: box-shadow ${transition.speed.default}
        ${transition.curve.default},
      background ${transition.speed.default} ${transition.curve.default};
    vertical-align: middle;
    white-space: normal;
    width: calc(100% - ${rhythm(6 / 4)});
  }
  .ais-SearchBox__input:hover,
  .ais-SearchBox__input:active,
  .ais-SearchBox__input:focus {
    box-shadow: none;
    outline: 0;
  }

  .ais-SearchBox__input:active,
  .ais-SearchBox__input:focus {
    border-color: ${colors.lilac};
    box-shadow: 0 0 0 3px ${colors.ui.bright};
  }

  .ais-SearchBox__input::-webkit-input-placeholder,
  .ais-SearchBox__input::-moz-placeholder,
  .ais-SearchBox__input:-ms-input-placeholder,
  .ais-SearchBox__input::placeholder {
    color: ${colors.lilac};
  }

  .ais-SearchBox__submit,
  .ais-SearchBox__reset {
    position: absolute;
    margin: 0;
    border: 0;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    width: ${searchInputHeight};
    height: ${searchInputHeight};
    text-align: center;
    font-size: inherit;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .ais-SearchBox__submit {
    top: ${searchInputWrapperMargin};
    right: inherit;
    left: ${searchInputWrapperMargin};
    border-radius: ${radii[2]}px 0 0 ${radii[2]}px;
  }
  .ais-SearchBox__submit:focus {
    outline: 0;
  }
  .ais-SearchBox__submit:focus svg {
    fill: ${colors.gatsby};
  }
  .ais-SearchBox__submit svg {
    width: ${rhythm(space[4])};
    height: ${rhythm(space[4])};
    vertical-align: middle;
    fill: ${colors.ui.bright};
  }

  .ais-SearchBox__reset {
    display: none;
    top: ${searchInputWrapperMargin};
    left: auto;
    right: ${searchInputWrapperMargin};
    font-size: inherit;
  }
  .ais-SearchBox__reset:focus {
    outline: 0;
  }
  .ais-SearchBox__reset:hover svg,
  .ais-SearchBox__reset:focus svg {
    fill: ${colors.gatsby};
  }
  .ais-SearchBox__reset svg {
    fill: ${colors.ui.bright};
    width: 12px;
    height: 12px;
    vertical-align: middle;
  }

  .ais-InfiniteHits__loadMore {
    background-color: transparent;
    border: 1px solid ${colors.gatsby};
    border-radius: ${radii[1]}px;
    color: ${colors.gatsby};
    cursor: pointer;
    width: calc(100% - ${rhythm(space[6] * 2)});
    margin: ${rhythm(space[6])};
    height: ${rhythm(space[9])};
    outline: none;
    transition: all ${transition.speed.default} ${transition.curve.default};
    font-family: ${options.headerFontFamily.join(`,`)};
  }
  .ais-InfiniteHits__loadMore:hover,
  .ais-InfiniteHits__loadMore:focus {
    background-color: ${colors.gatsby};
    color: ${colors.white};
  }

  .ais-InfiniteHits__loadMore[disabled] {
    display: none;
  }
`
/* stylelint-enable */

const StyledSkipNavLink = styled(SkipNavLink)({ ...skipLink })

// Search shows a list of "hits", and is a child of the PluginSearchBar component
class Search extends Component {
  render() {
    return (
      <div
        css={{
          paddingBottom: rhythm(2.5),
          [presets.Md]: {
            paddingBottom: 0,
          },
        }}
      >
        <div
          css={{
            borderBottom: `1px solid ${colors.ui.light}`,
            display: `flex`,
            flexDirection: `column`,
            width: `100%`,
          }}
        >
          <Global styles={searchBoxStyles} />
          <SearchBox translations={{ placeholder: `Search Gatsby Library` }} />

          <div css={{ display: `none` }}>
            <Configure analyticsTags={[`gatsby-plugins`]} />
            <RefinementList
              attributeName="keywords"
              transformItems={items =>
                items.map(({ count, ...item }) => {
                  return {
                    ...item,
                    count: count || 0,
                  }
                })
              }
              defaultRefinement={[`gatsby-component`, `gatsby-plugin`]}
            />
            <Toggle
              attributeName="deprecated"
              value={false}
              label="No deprecated plugins"
              defaultRefinement={true}
            />
          </div>

          <div
            css={{
              alignItems: `center`,
              color: colors.gray.calm,
              display: `flex`,
              height: searchMetaHeight,
              paddingLeft: rhythm(space[6]),
              paddingRight: rhythm(space[6]),
              fontSize: presets.scale[1],
            }}
          >
            <Stats
              translations={{
                stats: function(n, ms) {
                  return `${n} results`
                },
              }}
            />
            <StyledSkipNavLink>Skip to main content</StyledSkipNavLink>
          </div>
        </div>

        <div>
          <div
            css={{
              [presets.Md]: {
                height: `calc(100vh - ${presets.headerHeight} - ${
                  presets.bannerHeight
                } - ${searchInputHeight} - ${searchInputWrapperMargin} - ${searchMetaHeight})`,
                overflowY: `scroll`,
                ...scrollbarStyles,
              },
            }}
          >
            <InfiniteHits
              hitComponent={result => (
                <Result
                  hit={result.hit}
                  pathname={this.props.pathname}
                  query={this.props.query}
                />
              )}
            />
          </div>
        </div>

        <div
          css={{
            fontSize: 0,
            lineHeight: 0,
            height: 20,
            marginTop: rhythm(space[6]),
            display: `none`,
          }}
        >
          <a
            href={`https://www.algolia.com/`}
            css={{
              "&&": {
                background: `url(${AlgoliaLogo})`,
                border: `none`,
                fontWeight: `normal`,
                backgroundRepeat: `no-repeat`,
                backgroundPosition: `50%`,
                backgroundSize: `100%`,
                overflow: `hidden`,
                textIndent: `-9000px`,
                padding: `0!important`,
                width: 110,
                height: `100%`,
                display: `block`,
                marginLeft: `auto`,
                "&:hover": {
                  background: `url(${AlgoliaLogo})`,
                  backgroundRepeat: `no-repeat`,
                  backgroundPosition: `50%`,
                  backgroundSize: `100%`,
                },
              },
            }}
          >
            Algolia
          </a>
        </div>
      </div>
    )
  }
}

// the result component is fed into the InfiniteHits component
const Result = ({ hit, pathname, query }) => {
  // Example:
  // pathname = `/packages/gatsby-link/` || `/packages/@comsoc/gatsby-mdast-copy-linked-files`
  //  hit.name = `gatsby-link` || `@comsoc/gatsby-mdast-copy-linked-files`
  const selected = new RegExp(`^/packages/${hit.name}/?$`).test(pathname)
  return (
    <Link
      to={`/packages/${hit.name}/?=${query}`}
      css={{
        "&&": {
          background: selected ? colors.white : false,
          borderBottom: 0,
          color: colors.gray.dark,
          display: `block`,
          fontWeight: `400`,
          padding: `${rhythm(space[4])} ${rhythm(space[6])}`,
          position: `relative`,
          transition: `all ${transition.speed.default} ${
            transition.curve.default
          }`,
          zIndex: selected ? 1 : false,
          "&:hover": {
            background: selected ? colors.white : colors.ui.border,
          },
          "&:before": {
            background: colors.ui.border,
            bottom: 0,
            content: `''`,
            height: 1,
            left: 0,
            position: `absolute`,
            top: `auto`,
            width: `100%`,
          },
          "&:after": {
            background: selected ? colors.gatsby : false,
            bottom: 0,
            content: `''`,
            position: `absolute`,
            left: 0,
            top: -1,
            width: 4,
          },
        },
      }}
    >
      <div
        css={{
          alignItems: `baseline`,
          display: `flex`,
          justifyContent: `space-between`,
          marginBottom: rhythm(space[3]),
        }}
      >
        <h2
          css={{
            color: selected ? colors.gatsby : false,
            fontSize: `inherit`,
            fontFamily: options.headerFontFamily.join(`,`),
            fontWeight: `bold`,
            display: `flex`,
            alignItems: `center`,
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          {hit.name}
        </h2>
        <div>
          <VisuallyHidden>
            {hit.downloadsLast30Days} monthly downloads
          </VisuallyHidden>
        </div>
        <div
          aria-hidden
          css={{
            alignItems: `center`,
            color: selected ? colors.lilac : colors.gray.bright,
            display: `flex`,
            fontSize: presets.scale[0],
          }}
        >
          {hit.repository &&
            hit.name[0] !== `@` &&
            hit.repository.url.indexOf(`https://github.com/gatsbyjs/gatsby`) ===
              0 && (
              <img
                src={GatsbyIcon}
                css={{
                  height: 12,
                  marginBottom: 0,
                  marginRight: 5,
                  filter: selected ? false : `grayscale(100%)`,
                  opacity: selected ? false : `0.2`,
                }}
                alt={`Official Gatsby Plugin`}
              />
            )}
          <span
            css={{
              width: `5em`,
              textAlign: `right`,
            }}
          >
            {hit.humanDownloadsLast30Days}
            {` `}
            <span
              css={{
                color: selected ? colors.lilac : colors.gray.bright,
                marginLeft: rhythm(space[1]),
              }}
            >
              <DownloadArrow />
            </span>
          </span>
        </div>
      </div>
      <div
        css={{
          color: selected ? `inherit` : colors.gray.calm,
          fontSize: presets.scale[1],
        }}
      >
        {removeMD(unescape(hit.description))}
      </div>
    </Link>
  )
}

// the search bar holds the Search component in the InstantSearch widget
class PluginSearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { searchState: { query: this.urlToSearch(), page: 1 } }
    this.updateHistory = debounce(this.updateHistory, updateAfter)
  }

  urlToSearch = () => {
    if (this.props.location.search) {
      // ignore this automatically added query parameter
      return this.props.location.search.replace(`no-cache=1`, ``).slice(2)
    }
    return ``
  }

  updateHistory(value) {
    reachNavigate(`${this.props.location.pathname}?=${value.query}`, {
      replace: true,
    })
  }

  onSearchStateChange = searchState => {
    this.updateHistory(searchState)
    this.setState({ searchState })
  }

  render() {
    return (
      <div>
        <InstantSearch
          apiKey="ae43b69014c017e05950a1cd4273f404"
          appId="OFCNCOG2CU"
          indexName="npm-search"
          searchState={this.state.searchState}
          onSearchStateChange={this.onSearchStateChange}
        >
          <Search
            pathname={this.props.location.pathname}
            query={this.state.searchState.query}
          />
        </InstantSearch>
      </div>
    )
  }
}

export default PluginSearchBar
