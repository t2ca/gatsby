import React from "react"
import presets, { colors, space } from "../../utils/presets"
import { options, rhythm } from "../../utils/typography"
import TechWithIcon from "../../components/tech-with-icon"
import GithubIcon from "react-icons/lib/fa/github"
import { NetlifyIcon } from "../../assets/logos"

const Source = ({ startersYaml, repoUrl }) => (
  <div
    css={{
      display: `flex`,
      borderTop: `1px solid ${colors.ui.light}`,
      fontFamily: options.headerFontFamily.join(`,`),
      margin: `0 ${rhythm(space[6])}`,
      [presets.Sm]: {
        borderTop: 0,
      },
      [presets.Lg]: {
        margin: `0 ${rhythm(space[8])}`,
      },
    }}
  >
    {repoUrl && (
      <div
        css={{
          padding: 20,
          paddingLeft: startersYaml.featured ? false : 0,
          display: `flex`,
          alignItems: `center`,
        }}
      >
        <GithubIcon
          css={{
            marginBottom: 0,
            marginRight: 10,
            height: 26,
            width: 20,
            color: colors.gatsby,
          }}
        />
        <a
          href={repoUrl}
          css={{
            "&&": {
              borderBottom: 0,
              color: colors.gatsby,
              cursor: `pointer`,
              fontWeight: `normal`,
              "&:hover": {
                color: colors.lilac,
              },
            },
          }}
        >
          Source
        </a>
      </div>
    )}

    <div
      css={{
        display: `none`,
        [presets.Lg]: {
          padding: 20,
          paddingLeft: 0,
          flex: 1,
          justifyContent: `flex-end`,
          display: `flex`,
          alignItems: `center`,
        },
      }}
    >
      <span
        css={{
          marginRight: 20,
          color: colors.gray.calm,
        }}
      >
        Try this starter
      </span>
      <a
        href={`https://app.netlify.com/start/deploy?repository=${repoUrl}`}
        css={{
          "&&": {
            borderBottom: 0,
            color: colors.gatsby,
            cursor: `pointer`,
            fontWeight: `normal`,
            "&:hover": {
              color: colors.lilac,
            },
          },
        }}
      >
        <TechWithIcon icon={NetlifyIcon}>Netlify</TechWithIcon>
      </a>
    </div>
  </div>
)

export default Source
