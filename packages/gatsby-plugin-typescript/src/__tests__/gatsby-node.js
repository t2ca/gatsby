const {
  resolvableExtensions,
  onCreateBabelConfig,
  onCreateWebpackConfig,
} = require(`../gatsby-node`)

describe(`gatsby-plugin-typescript`, () => {
  describe(`resolvableExtensions`, () => {
    it(`returns the correct resolvable extensions`, () => {
      expect(resolvableExtensions()).toEqual([`.ts`, `.tsx`])
    })
  })

  describe(`onCreateBabelConfig`, () => {
    it(`sets the correct babel preset`, () => {
      const actions = { setBabelPreset: jest.fn() }
      const options = {
        isTSX: true,
        jsxPragma: `jsx`,
        allExtensions: true,
      }
      onCreateBabelConfig({ actions }, options)
      expect(actions.setBabelPreset).toHaveBeenCalledWith({
        name: `@babel/preset-typescript`,
        options,
      })
    })
  })

  describe(`onCreateWebpackConfig`, () => {
    it(`sets the correct webpack config`, () => {
      const actions = { setWebpackConfig: jest.fn() }
      const jsLoader = {}
      const loaders = { js: jest.fn(() => jsLoader) }
      onCreateWebpackConfig({ actions, loaders })
      expect(actions.setWebpackConfig).toHaveBeenCalledWith({
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              use: jsLoader,
            },
          ],
        },
      })
    })

    it(`does not set the webpack config if there isn't a js loader`, () => {
      const actions = { setWebpackConfig: jest.fn() }
      const loaders = { js: jest.fn() }
      onCreateWebpackConfig({ actions, loaders })
      expect(actions.setWebpackConfig).not.toHaveBeenCalled()
    })
  })
})
