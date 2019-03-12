import { graphql } from "gatsby"
import React from "react"

import { rhythm, scale, options } from "../utils/typography"
import presets, { space, colors } from "../utils/presets"

const Param = (param, depth = 0) => {
  // The "plugin" parameter is used internally but not
  // something a user should use.
  if (param.name === `plugin` || param.name === `traceId`) {
    return null
  }

  return (
    <div
      key={`param ${JSON.stringify(param)}`}
      css={{
        marginLeft: `${rhythm(depth * 1)}`,
        ...(depth > 0 && scale((depth === 1 ? -1 : -1.5) / 5)),
        lineHeight: options.baseLineHeight,
      }}
    >
      <h5
        css={{
          margin: 0,
          ...(depth > 0 && scale((depth === 1 ? 0 : -0.5) / 5)),
        }}
      >
        {param.name === `$0` ? `destructured object` : param.name}
        {` `}
        {param.type && param.name !== `$0` && (
          <span css={{ color: colors.gray.calm, fontWeight: `normal` }}>{`{${
            param.type.name
          }}`}</span>
        )}
        {param.default && (
          <span css={{ color: colors.gray.calm, fontWeight: `normal` }}>
            [default=
            {param.default}]
          </span>
        )}
      </h5>
      {param.description && (
        <div
          dangerouslySetInnerHTML={{
            __html: param.description.childMarkdownRemark.html,
          }}
        />
      )}
      {param.properties && (
        <div
          css={{
            marginBottom: rhythm(space[5]),
            marginTop: rhythm(space[3]),
          }}
        >
          {param.properties.map(param => Param(param, depth + 1))}
        </div>
      )}
    </div>
  )
}

export default ({ functions }) => (
  <div>
    {functions.map((node, i) => (
      <div
        id={node.name}
        key={`reference list ${node.name}`}
        css={{ marginBottom: rhythm(space[5]) }}
      >
        {i !== 0 && <hr />}
        <h3>
          <a href={`#${node.name}`}>
            <code>{node.name}</code>
          </a>
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: node.description.childMarkdownRemark.html,
          }}
        />
        {(node.params && node.params.length) > 0 && (
          <div>
            <h4>Parameters</h4>
            {node.params.map(param => Param(param, 0))}
          </div>
        )}
        {node.returns && node.returns.length > 0 && (
          <div>
            <h4>Return value</h4>
            {node.returns.map(ret => (
              <div
                key={`ret ${JSON.stringify(ret)}`}
                css={{
                  marginLeft: rhythm(space[4]),
                  fontSize: presets.scale[1],
                  lineHeight: options.baseLineHeight,
                }}
              >
                <h5 css={{ margin: 0 }}>
                  <span css={{ color: colors.gray.calm }}>
                    {`{${
                      ret.type.type === `UnionType`
                        ? ret.type.elements.map(el => String(el.name)).join(`|`)
                        : ret.type.name
                    }}`}
                  </span>
                </h5>
                {ret.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: ret.description.childMarkdownRemark.html,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {node.examples && node.examples.length > 0 && (
          <div>
            <h4 css={{ marginTop: rhythm(space[5]) }}>Example</h4>
            {` `}
            {node.examples.map((example, i) => (
              <div
                className="gatsby-highlight"
                key={`${node.name} example ${i}`}
              >
                <pre className="language-javascript">
                  <code
                    className="language-javascript"
                    dangerouslySetInnerHTML={{
                      __html: example.highlighted,
                    }}
                  />
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
)

export const pageQuery = graphql`
  fragment FunctionList on DocumentationJs {
    name
    description {
      childMarkdownRemark {
        html
      }
    }
    returns {
      type {
        name
        type
        elements {
          name
          type
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
    }
    examples {
      highlighted
    }
    params {
      name
      type {
        name
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      properties {
        name
        type {
          name
        }
        default
        description {
          childMarkdownRemark {
            html
          }
        }
        properties {
          name
          type {
            name
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
