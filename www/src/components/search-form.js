import React, { Component } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { rhythm } from "../utils/typography"

import presets, { colors, space, radii, transition } from "../utils/presets"
import hex2rgba from "hex2rgba"
import SearchIcon from "./search-icon"

const loadJS = () => import(`./docsearch.min.js`)
let loadedJs = false

import { Global, css } from "@emotion/core"

// Override default search result styles (docsearch.css)
const searchDropdownOffsetTop = rhythm(space[9])

const algoliaStyles = css`
  .algolia-autocomplete .ds-dropdown-menu {
    position: fixed !important;
    top: calc(${searchDropdownOffsetTop} + ${presets.bannerHeight}) !important;
    left: ${rhythm(space[3])} !important;
    right: ${rhythm(space[3])} !important;
    min-width: calc(100vw - ${rhythm(space[5])}) !important;
    max-width: calc(100vw - 2rem) !important;
    box-shadow: 0 3px 10px 0.05rem ${hex2rgba(colors.lilac, 0.25)} !important;
  }

  /* .searchWrap to beat docsearch.css' !important */
  .searchWrap
    .algolia-autocomplete.algolia-autocomplete-right
    .ds-dropdown-menu,
  .searchWrap
    .algolia-autocomplete.algolia-autocomplete-left
    .ds-dropdown-menu {
    left: ${rhythm(space[3])} !important;
    right: ${rhythm(space[3])} !important;
  }

  .algolia-autocomplete .ds-dropdown-menu .ds-suggestions {
    margin-top: 0 !important;
  }

  .algolia-docsearch-suggestion--wrapper {
    padding-top: 0 !important;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--subcategory-column {
    color: ${colors.gray.calm} !important;
    font-size: ${presets.scale[1]} !important;
    font-weight: normal !important;
    padding: ${rhythm(space[1])} ${rhythm(space[3])} !important;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion--subcategory-column:before {
    background: ${colors.ui.light} !important;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion--subcategory-column:after {
    display: none !important;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion {
    padding: 0 !important;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--content {
    padding: ${rhythm(space[3])} !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  /* Caret */
  .algolia-autocomplete .ds-dropdown-menu::before {
    border-top-color: ${colors.ui.bright} !important;
    border-right-color: ${colors.ui.bright} !important;
  }

  .algolia-autocomplete .ds-dropdown-menu [class^="ds-dataset-"] {
    max-height: calc(
      100vh - ${presets.headerHeight} - ${presets.bannerHeight}
    ) !important;
    padding: 0 !important;
    border-color: ${colors.ui.bright} !important;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--highlight {
    background-color: ${colors.ui.bright} !important;
    box-shadow: 0 !important;
    color: ${colors.gatsby} !important;
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--text {
    color: ${colors.gray.calm} !important;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion--text
    .algolia-docsearch-suggestion--highlight {
    background: transparent !important;
    box-shadow: inset 0 -2px 0 0 ${colors.gatsby} !important;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion
    .algolia-docsearch-suggestion--subcategory-column {
    width: 100% !important;
  }

  .algolia-autocomplete
    .ds-dropdown-menu
    .ds-suggestion.ds-cursor
    .algolia-docsearch-suggestion:not(.suggestion-layout-simple)
    .algolia-docsearch-suggestion--content {
    background-color: ${colors.ui.light} !important;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion
    .algolia-docsearch-suggestion--content.algolia-docsearch-suggestion--no-results {
    max-width: 100% !important;
    width: 100% !important;
    font-weight: normal !important;
    padding: ${rhythm(space[4])} ${rhythm(space[3])} !important;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion
    .algolia-docsearch-suggestion--content.algolia-docsearch-suggestion--no-results
    .algolia-docsearch-suggestion--title {
    margin-bottom: 0 !important;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion
    .algolia-docsearch-suggestion--content.algolia-docsearch-suggestion--no-results
    .algolia-docsearch-suggestion--text {
    color: inherit !important;
    font-weight: normal !important;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion
    .algolia-docsearch-suggestion--content.algolia-docsearch-suggestion--no-results
    .algolia-docsearch-suggestion--text:after {
    content: "😔";
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--category-header {
    padding: ${rhythm(space[1])} ${rhythm(space[3])} !important;
    margin-top: 0 !important;
    font-size: ${presets.scale[1]} !important;
    border-color: ${colors.ui.light} !important;
    color: ${colors.gatsby} !important;
    font-weight: bold !important;
  }

  .searchWrap
    .algolia-autocomplete.algolia-autocomplete-right
    .ds-dropdown-menu::before {
    right: ${rhythm(4.75)} !important;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion
    .algolia-docsearch-suggestion--content.algolia-docsearch-suggestion--no-results:before {
    display: none !important;
  }

  .algolia-autocomplete .algolia-docsearch-footer {
    width: 100% !important;
    height: 30px !important;
    margin-top: 0 !important;
    border-top: 1px dotted ${colors.ui.light} !important;
  }

  .algolia-autocomplete .algolia-docsearch-footer--logo {
    width: 110px !important;
    height: 100% !important;
    margin-left: auto !important;
    margin-right: ${rhythm(space[3])} !important;
  }

  ${presets.Sm} {
    .algolia-autocomplete .algolia-docsearch-suggestion--category-header {
      color: inherit !important;
      font-weight: normal !important;
    }

    .algolia-autocomplete
      .algolia-docsearch-suggestion
      .algolia-docsearch-suggestion--subcategory-column {
      width: 30% !important;
      text-align: right !important;
      opacity: 1 !important;
      padding: ${rhythm(space[3])} ${rhythm(space[4])} !important;
    }

    /* stylelint-disable */
    .algolia-autocomplete .algolia-docsearch-suggestion--category-header {
      padding: ${rhythm(space[3])} ${rhythm(space[4])} !important;
    }
    /* stylelint-enable */

    .algolia-autocomplete .algolia-docsearch-suggestion--content {
      width: 70% !important;
      max-width: 70% !important;
      padding: ${rhythm(space[3])} ${rhythm(space[4])} !important;
    }

    .algolia-autocomplete .algolia-docsearch-suggestion--content:before,
    .algolia-autocomplete
      .algolia-docsearch-suggestion--subcategory-column:after {
      display: block !important;
      content: "" !important;
      position: absolute !important;
      top: 0 !important;
      height: 100% !important;
      width: 1px !important;
      background: ${colors.ui.light} !important;
    }

    .algolia-autocomplete
      .algolia-docsearch-suggestion--subcategory-column:after {
      right: 0 !important;
    }

    .algolia-autocomplete .algolia-docsearch-suggestion--content:before {
      left: -1px !important;
    }
  }

  ${presets.Md} {
    .algolia-autocomplete .ds-dropdown-menu {
      top: 100% !important;
      position: absolute !important;
      max-width: 600px !important;
      min-width: 500px !important;
    }

    /* .searchWrap to beat docsearch.css' !important */
    .searchWrap
      .algolia-autocomplete.algolia-autocomplete-right
      .ds-dropdown-menu {
      right: 0 !important;
      left: inherit !important;
    }

    .searchWrap
      .algolia-autocomplete.algolia-autocomplete-right
      .ds-dropdown-menu::before {
      right: ${rhythm(3)} !important;
    }
  }

  @media ${presets.lg} {
    .algolia-autocomplete .ds-dropdown-menu {
      max-width: 600px !important;
      min-width: 540px !important;
    }

    .algolia-autocomplete
      .algolia-docsearch-suggestion
      .algolia-docsearch-suggestion--subcategory-column {
      width: 35% !important;
    }

    .algolia-autocomplete .algolia-docsearch-suggestion--content {
      width: 65% !important;
      max-width: 65% !important;
    }
  }
`

class SearchForm extends Component {
  constructor() {
    super()
    this.state = { focussed: false }
    this.autocompleteSelected = this.autocompleteSelected.bind(this)
  }
  /**
   * Replace the default selection event, allowing us to do client-side
   * navigation thus avoiding a full page refresh.
   *
   * Ref: https://github.com/algolia/autocomplete.js#events
   */ autocompleteSelected(e) {
    e.stopPropagation()
    // Use an anchor tag to parse the absolute url (from autocomplete.js) into a relative url
    const a = document.createElement(`a`)
    a.href = e._args[0].url
    this.searchInput.blur()
    navigate(`${a.pathname}${a.hash}`)
  }
  init() {
    if (this.algoliaInitialized) {
      return
    }

    window.addEventListener(
      `autocomplete:selected`,
      this.autocompleteSelected,
      true
    )
    window.docsearch({
      apiKey: `71af1f9c4bd947f0252e17051df13f9c`,
      indexName: `gatsbyjs`,
      inputSelector: `#doc-search`,
      debug: false,
      autocompleteOptions: {
        openOnFocus: true,
        autoselect: true,
        hint: false,
        keyboardShortcuts: [`s`],
      },
    })
    this.algoliaInitialized = true
  }
  componentDidMount() {
    if (
      typeof window === `undefined` ||
      typeof window.docsearch === `undefined`
    ) {
      // Algolia's docsearch lib not loaded yet so load it.
      // Lazy load css
      const path = `https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css`
      const link = document.createElement(`link`)
      link.setAttribute(`rel`, `stylesheet`)
      link.setAttribute(`type`, `text/css`)
      link.setAttribute(`href`, path)
      document.head.appendChild(link)
    }
  }
  componentWillUnmount() {
    window.removeEventListener(
      `autocomplete:selected`,
      this.autocompleteSelected,
      true
    )
  }
  loadAlgoliaJS() {
    if (!loadedJs) {
      loadJS().then(a => {
        loadedJs = true
        window.docsearch = a.default
        this.init()
      })
    } else {
      this.init()
    }
  }
  render() {
    const { focussed } = this.state
    const { offsetVertical } = this.props
    return (
      <form
        css={{
          display: `flex`,
          flex: `0 0 auto`,
          flexDirection: `row`,
          alignItems: `center`,
          marginLeft: rhythm(space[3]),
          marginBottom: 0,
          marginTop: offsetVertical ? offsetVertical : false,
        }}
        className="searchWrap"
        onMouseOver={() => this.loadAlgoliaJS()}
        onClick={() => this.loadAlgoliaJS()}
        onSubmit={e => e.preventDefault()}
      >
        <Global styles={algoliaStyles} />
        <label
          css={{
            position: `relative`,
          }}
        >
          <input
            id="doc-search"
            css={{
              appearance: `none`,
              backgroundColor: `transparent`,
              border: 0,
              borderRadius: radii[1],
              color: colors.lilac,
              padding: rhythm(space[1]),
              paddingRight: rhythm(space[3]),
              paddingLeft: rhythm(space[7]),
              overflow: `hidden`,
              width: rhythm(space[5]),
              transition: `width ${transition.speed.default} ${
                transition.curve.default
              }, background-color ${transition.speed.default} ${
                transition.curve.default
              }`,
              ":focus": {
                backgroundColor: colors.ui.light,
                color: colors.gatsby,
                outline: 0,
                width: rhythm(5),
              },
              [presets.Lg]: {
                backgroundColor: colors.white,
                width: rhythm(3.75),
                ":focus": {
                  backgroundColor: colors.ui.light,
                },
              },
            }}
            type="search"
            placeholder="Search"
            aria-label="Search"
            title="Hit 's' to search docs"
            onFocus={() => this.setState({ focussed: true })}
            onBlur={() => this.setState({ focussed: false })}
            ref={input => {
              this.searchInput = input
            }}
          />
          <SearchIcon
            overrideCSS={{
              fill: focussed ? colors.gatsby : colors.lilac,
              position: `absolute`,
              left: rhythm(space[2]),
              top: `50%`,
              width: rhythm(space[4]),
              height: rhythm(space[4]),
              pointerEvents: `none`,
              transition: `fill ${transition.speed.default} ${
                transition.curve.default
              }`,
              transform: `translateY(-55%)`,
              [presets.Sm]: {
                fill: focussed ? colors.gatsby : false,
              },
            }}
          />
        </label>
      </form>
    )
  }
}
SearchForm.propTypes = {
  iconColor: PropTypes.string,
  offsetVertical: PropTypes.string,
}
export default SearchForm
