---
title: "Writing documentation with Docz"
---

Writing good documentation is important for your project maintainers (and for your future self!). A very nice documentation generator is [Docz](https://www.docz.site). It allows you to easily write interactive docs for your React components.

Docz leverages `mdx` files -- short for Markdown with JSX-- which brings **React components** to Markdown files. From your PropTypes, or Flow types or TypeScript types, it can generate **property tables** to document properly how to use your components. In addition, you can provide a **coding playground** for your components, so that anyone can see them in action, modify the code and see the changes live, or copy the snippet to use it somewhere else.

If you're starting your Gatsby project from scratch and would like to have great documentation, with Docz support out of the box, you can use the starter mentioned in [Other Resources](#other-resources) below.

Alternatively, the following guide should help you to get Docz working within an existing Gatsby project.

## Setting up your environment

First, if you do not have a Gatsby project set up yet, use the Gatsby CLI to create a new site:

```shell
gatsby new my-gatsby-site-with-docz
```

To set up Docz you need to install dependencies and do some custom configuration. Make sure you are in the root directory of your Gatsby project:

```shell
cd my-gatsby-site-with-docz
gatsby develop
```

and test that your Gatsby site is running by going to http://localhost:8000.

Going back to your terminal, install the necessary dev dependencies to get a Docz site up and running.

```shell
# run this from my-gatsby-site-with-docz/
npm install --save-dev docz docz-theme-default docz-plugin-css @babel/plugin-syntax-dynamic-import webpack-merge
```

Add the following scripts to your `package.json` file:

```json:title=package.json
{
    ...
    "scripts": {
        ...
        "docz:dev": "docz dev",
        "docz:build": "docz build",
        ...
    }
    ...
}
```

Create these two files:

- `doczrc.js` to configure Docz,
- `docz/wrapper.js` to inject some JavaScript in Docz pages, to ensure compatibility with Gatsby.

Create a new folder `docz`, and inside that folder, a new file `wrapper.js`. Add the following code to `wrapper.js`:

```js:title=docz/wrapper.js
import * as React from "react"

// Gatsby's Link overrides:
// Gatsby internal mocking to prevent unnecessary error in docz: __PATH_PREFIX__ is not defined
global.__PATH_PREFIX__ = ""

export default ({ children }) => children
```

> You are essentially creating a dummy wrapper that does nothing else than making sure that `global.__PATH_PREFIX__` is defined on every page.

Create a new file called `doczrc.js` in the root directory of your Gatsby project, and add the following content:

```js:title=doczrc.js
import merge from "webpack-merge"
import { css } from "docz-plugin-css"

export default {
  title: "Docz with Gatsby",
  // Add CSS support in case you use them in your Gatsby project
  plugins: [css()],
  // highlight-next-line
  // Wrapper used to inject some global variable mocks
  wrapper: "docz/wrapper.js",
  modifyBundlerConfig: config => {
    const gatsbyNecessaryConfig = {
      module: {
        rules: [
          {
            // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
            // Ignore .json files because they fail to be parsed
            exclude: [/node_modules\/(?!(gatsby)\/)/, /\.json$/],
            use: [
              {
                // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
                loader: "babel-loader",
                options: {
                  // use @babel/preset-react for JSX and env (instead of staged presets)
                  presets: ["@babel/preset-react", "@babel/preset-env"],
                  plugins: [
                    // use @babel/plugin-proposal-class-properties for class arrow functions
                    "@babel/plugin-proposal-class-properties",
                    // use @babel/plugin-syntax-dynamic-import for dynamic import support
                    "@babel/plugin-syntax-dynamic-import",
                  ],
                },
              },
            ],
          },
        ],
      },
    }

    return merge(gatsbyNecessaryConfig, config)
  },
}
```

Once you have this configured you should run Docz to ensure it can start up properly. You should see by default a _Page Not Found_ page, this is fine as you haven't created any `mdx` files yet. To run Docz:

```shell
npm run docz:dev
```

If Docz builds successfully you should be able to navigate to `http://localhost:3000` and see the default _Page Not Found_ page.

## Writing documentation

Docz searches your directory for `mdx` files and renders them. Let's add your first documentation page by creating a file `index.mdx` in the root directory of your Gatsby project.

```mdx:title=index.mdx
---
name: Getting started
route: /
---

# Getting Started

This is the start of an amazing Docz site
```

This is a very simple documentation page without much going on, but let's spice things up by adding and rendering a Gatsby component. Assuming you have a header component in your components folder which does not rely on `StaticQuery` or `graphql`, you can add:

```mdx:title=index.mdx
---
name: Getting started
route: /
---

//highlight-next-line
import Header from './src/components/header'

# Getting Started

This is the start of an amazing Docz site

//highlight-next-line

<Header siteTitle="Hello from Gatsby" />
```

Restart the Docz server and voilà!

> Note: If your component relies on `StaticQuery` or `graphql`, consider splitting it into two smaller components:
>
> - one React component dealing only with the **UI layer**, and
> - another dealing with the **data layer**.
>
> You could showcase the UI layer React component in your `mdx` files and your data layer component could use it to render the data it fetched thanks to `StaticQuery` and `graphql`.

## Other resources

- For more information on Docz visit [the Docz site](https://docz.site/)
- Get started with a [Docz starter](https://github.com/RobinCsl/gatsby-starter-docz)
