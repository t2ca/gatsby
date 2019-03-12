---
title: Tailwind CSS
---

Tailwind is a utility-first CSS framework for rapidly building custom user interfaces. This guide will show you how to get started with Gatsby and [Tailwind CSS](https://tailwindcss.com/).

This guide assumes that you have a Gatsby project set up. If you need to set up a project, head to the [**Quick Start guide**](https://www.gatsbyjs.org/docs), then come back.

### Overview

There are two ways you can use Tailwind with Gatsby:

1. Standard: Use PostCSS to generate Tailwind classes, then you can apply those classes using `className`.
2. CSS-in-JS: Integrate Tailwind classes into Styled Components.

You have to install and configure Tailwind for both of these methods, so this guide will walk through that step first, then you can follow the instructions for either PostCSS or CSS-in-JS.

## Installing and Configuring Tailwind

1. Install Tailwind

```shell
npm install tailwindcss --save-dev
```

2. Generate Tailwind config file

To configure Tailwind, we'll need to add a Tailwind configuration file. Luckily, Tailwind has a built-in script to do this. Just run the following command:

```shell
./node_modules/.bin/tailwind init
```

## Option #1: PostCSS

1.  Install the Gatsby PostCSS plugin [**gatsby-plugin-postcss**](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-postcss).

```shell
npm install --save gatsby-plugin-postcss
```

2.  Include the plugin in your `gatsby-config.js` file.

```javascript:title=gatsby-config.js
plugins: [`gatsby-plugin-postcss`],
```

3. Configure PostCSS to use Tailwind

Create a postcss.config.js in your project's root folder with the following contents.

```javascript:title=postcss.config.js
module.exports = () => ({
  plugins: [require("tailwindcss")("./tailwind.js")],
})
```

4. Use the Tailwind Directives in your CSS

You can now use the `@tailwind` directives to add Tailwind's utilites, preflight, and components into your CSS. You can also use `@apply` and all of Tailwind's other directives and functions!

To learn more about how to use Tailwind in your CSS, visit the [Tailwind Documentation](https://tailwindcss.com/docs/installation#3-use-tailwind-in-your-css)

## Option #2: CSS-in-JS

These steps assume you have a CSS-in-JS library already installed, and the examples are based on Styled Components.

1. Install Tailwind Babel Macro

```shell
npm install --save tailwind.macro
```

2. Use the Babel Macro (tailwind.macro) in your styled component

```javascript
import styled from "styled-components"
import tw from "tailwind.macro"

const Button = styled.button`
  ${tw`bg-blue hover:bg-blue-dark text-white p-2 rounded`};
`
```

### Other resources

- [Introduction to PostCSS](https://www.smashingmagazine.com/2015/12/introduction-to-postcss/)
- [Tailwind Documentation](https://tailwindcss.com/)
- [Gatsby starters that use Tailwind](https://www.gatsbyjs.org/starters/?c=Styling%3ATailwind&v=2)
