import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { SkipNavLink } from "@reach/skip-nav"
import styled from "@emotion/styled"

import Banner from "../banner"
import PageHeading from "./page-heading"
import Navigation from "../navigation"
import MobileNavigation from "../navigation-mobile"

import presets from "../../utils/presets"
import { skipLink } from "../../utils/styles"

// Import Futura PT typeface
import "../../fonts/Webfonts/futurapt_book_macroman/stylesheet.css"
import "../../fonts/Webfonts/futurapt_bookitalic_macroman/stylesheet.css"
import "../../fonts/Webfonts/futurapt_demi_macroman/stylesheet.css"
import "../../fonts/Webfonts/futurapt_demiitalic_macroman/stylesheet.css"

const Content = styled(`div`)`
  padding-top: ${presets.bannerHeight};
  padding-bottom: 3.5rem;

  ${presets.Md} {
    margin-left: ${presets.pageHeadingDesktopWidth};
    padding-top: calc(${presets.bannerHeight} + ${presets.headerHeight});
    padding-bottom: 0;
  }
`

const StyledSkipNavLink = styled(SkipNavLink)({
  ...skipLink,
})

const LayoutWithHeading = props => {
  const {
    children,
    location: { pathname },
    pageTitle = ``,
    pageIcon,
  } = props

  const isHomepage = pathname === `/`

  return (
    <div className={` ${isHomepage ? `isHomepage` : ``}`}>
      <Helmet>
        <title>{pageTitle ? `${pageTitle} | GatsbyJS` : `GatsbyJS`}</title>
        <meta name="twitter:site" content="@gatsbyjs" />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="GatsbyJS" />
        <link rel="canonical" href={`https://gatsbyjs.org${pathname}`} />
        <html lang="en" />
      </Helmet>

      <StyledSkipNavLink>Skip to main content</StyledSkipNavLink>

      <Banner />

      <Navigation pathname={props.location.pathname} />

      <Content>
        {pageTitle && <PageHeading title={pageTitle} icon={pageIcon} />}
        {children}
      </Content>

      <MobileNavigation />
    </div>
  )
}

LayoutWithHeading.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  pageTitle: PropTypes.string,
  pageIcon: PropTypes.string,
}

export default LayoutWithHeading
