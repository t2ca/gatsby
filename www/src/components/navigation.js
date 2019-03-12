import React from "react"
import { Link } from "gatsby"
import GithubIcon from "react-icons/lib/go/mark-github"
import TwitterIcon from "react-icons/lib/fa/twitter"
import SearchForm from "../components/search-form"
import DiscordIcon from "../components/discord"
import logo from "../logo.svg"
import { rhythm, options } from "../utils/typography"
import presets, { colors, space, transition } from "../utils/presets"

// what we need to nudge down the navItems to sit
// on the baseline of the logo's wordmark
const navItemTopOffset = `0.6rem`
const navItemHorizontalSpacing = rhythm(space[2])

const iconColor = colors.lilac

const assignActiveStyles = ({ isPartiallyCurrent }) =>
  isPartiallyCurrent ? { style: styles.navItem.active } : {}

const NavItem = ({ linkTo, children }) => (
  <li css={styles.li}>
    <Link to={linkTo} getProps={assignActiveStyles} css={styles.navItem}>
      {children}
    </Link>
  </li>
)

const Navigation = ({ pathname }) => {
  const isHomepage = pathname === `/`
  const isBlog = pathname === `/blog/` || pathname.indexOf(`/blog/page/`) === 0

  const socialIconsStyles = {
    ...styles.navItem,
    ...styles.socialIconItem,
  }

  const SocialNavItem = ({ href, title, children, overrideCSS }) => (
    <a
      href={href}
      title={title}
      css={{
        ...socialIconsStyles,
        ...overrideCSS,
      }}
    >
      {children}
    </a>
  )

  return (
    <header
      css={{
        backgroundColor: `rgba(255,255,255,0.975)`,
        position: `relative`,
        height: presets.headerHeight,
        left: 0,
        right: 0,
        top: presets.bannerHeight,
        zIndex: 2,
        "&:after": {
          content: `''`,
          position: `absolute`,
          bottom: 0,
          left: 0,
          right: 0,
          width: `100%`,
          height: 1,
          zIndex: -1,
          background: isHomepage ? `transparent` : colors.ui.light,
        },
        // use this to test if the header items are properly aligned to the logo
        // wordmark
        // "&:before": {
        //   content: `''`,
        //   position: `absolute`,
        //   bottom: `1.25rem`,
        //   left: 0,
        //   right: 0,
        //   width: `100%`,
        //   height: 1,
        //   zIndex: 10,
        //   background: `red`,
        // },
        [presets.Md]: {
          position: isHomepage || isBlog ? `absolute` : `fixed`,
          backgroundColor: isBlog ? colors.ui.whisper : false,
        },
        paddingLeft: `env(safe-area-inset-left)`,
        paddingRight: `env(safe-area-inset-right)`,
      }}
    >
      <div css={{ ...styles.containerInner }}>
        <Link
          to="/"
          css={styles.logoLink}
          aria-label="Gatsby, Back to homepage"
        >
          <img
            src={logo}
            css={styles.logo}
            alt="Gatsby Logo"
            aria-hidden="true"
          />
        </Link>
        <nav
          className="navigation"
          aria-label="Primary Navigation"
          css={styles.navContainer}
        >
          <ul css={styles.ulContainer}>
            <NavItem linkTo="/docs/">Docs</NavItem>
            <NavItem linkTo="/tutorial/">Tutorial</NavItem>
            <NavItem linkTo="/plugins/">Plugins</NavItem>
            <NavItem linkTo="/features/">Features</NavItem>
            <NavItem linkTo="/blog/">Blog</NavItem>
            <NavItem linkTo="/showcase/">Showcase</NavItem>
            <NavItem linkTo="/contributing/">Contributing</NavItem>
            {/* <li css={styles.li}>
                <Link
                  to="/community/"
                  css={styles.navItem}
                  state={{ filter: `` }}
                >
                  Community
                </Link>
              </li> */}
          </ul>
        </nav>
        <div css={styles.searchAndSocialContainer}>
          <SearchForm
            key="SearchForm"
            iconColor={iconColor}
            offsetVertical="-0.2175rem"
          />
          <SocialNavItem
            href="https://github.com/gatsbyjs/gatsby"
            title="GitHub"
          >
            <GithubIcon style={{ verticalAlign: `text-top` }} />
          </SocialNavItem>
          <div
            css={{
              display: `none`,
              [presets.Lg]: { display: `flex` },
            }}
          >
            <SocialNavItem href="https://gatsby.dev/discord" title="Discord">
              <DiscordIcon overrideCSS={{ verticalAlign: `text-top` }} />
            </SocialNavItem>
            <SocialNavItem href="https://twitter.com/gatsbyjs" title="Twitter">
              <TwitterIcon style={{ verticalAlign: `text-top` }} />
            </SocialNavItem>
          </div>
          <SocialNavItem
            href="https://www.gatsbyjs.com"
            title="gatsbyjs.com"
            overrideCSS={{ paddingRight: 0 }}
          >
            .com
          </SocialNavItem>
        </div>
      </div>
    </header>
  )
}

const styles = {
  li: {
    display: `block`,
    margin: 0,
    marginLeft: navItemHorizontalSpacing,
    marginRight: navItemHorizontalSpacing,
  },
  navContainer: {
    display: `none`,
    [presets.Md]: {
      alignSelf: `flex-end`,
      display: `flex`,
    },
  },
  ulContainer: {
    display: `none`,
    [presets.Md]: {
      alignSelf: `flex-end`,
      display: `flex`,
      flexGrow: 1,
      margin: 0,
      listStyle: `none`,
      maskImage: `linear-gradient(to right, transparent, white ${rhythm(
        1 / 8
      )}, white 98%, transparent)`,
      overflowX: `auto`,
    },
  },
  containerInner: {
    margin: `0 auto`,
    paddingLeft: rhythm(space[6]),
    paddingRight: rhythm(space[6]),
    fontFamily: options.headerFontFamily.join(`,`),
    display: `flex`,
    alignItems: `center`,
    width: `100%`,
    height: `100%`,
  },
  navItem: {
    fontSize: presets.scale[1],
    borderBottom: `0.125rem solid transparent`,
    color: `inherit`,
    display: `block`,
    letterSpacing: presets.letterSpacings.tracked,
    WebkitFontSmoothing: `antialiased`,
    lineHeight: `calc(${presets.headerHeight} - ${navItemTopOffset})`,
    position: `relative`,
    textDecoration: `none`,
    textTransform: `uppercase`,
    top: 0,
    transition: `color ${transition.speed.default} ${transition.curve.default}`,
    zIndex: 1,
    "&:hover": {
      color: colors.gatsby,
    },
    active: {
      borderBottomColor: colors.gatsby,
      color: colors.gatsby,
    },
  },
  socialIconItem: {
    color: iconColor,
    paddingLeft: navItemHorizontalSpacing,
    paddingRight: navItemHorizontalSpacing,
  },
  searchAndSocialContainer: {
    alignSelf: `flex-end`,
    display: `flex`,
    marginLeft: `auto`,
  },
  logo: {
    height: rhythm(space[6]),
    margin: 0,
  },
  logoLink: {
    alignItems: `center`,
    color: `inherit`,
    display: `flex`,
    flexShrink: 0,
    marginRight: rhythm(space[3]),
    textDecoration: `none`,
  },
}

export default Navigation
