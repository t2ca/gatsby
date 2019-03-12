---
title: Docs Contributions
---

Gatsby, unsurprisingly, uses Gatsby for its documentation website. Thank you in advance and cheers for contributing to Gatsby documentation! As of February 2019, over 800 people have contributed. It's people like you that make this community great!

On this page:

- [Top priorities](#top-priorities)
- [Options for contributing to the Gatsby docs](#options-for-contributing-to-the-gatsby-docs)
- [Modifying markdown files](#modifying-markdown-files)
  - [Converting a document from a stub](#converting-a-document-from-a-stub)
- [Docs site setup instructions](#docs-site-setup-instructions)
- [Claim your swag](#claim-your-swag)
- [Want more?](#want-more)

## Top priorities

Check the GitHub repo for issues labeled with ["documentation" and "good first issue"](https://github.com/gatsbyjs/gatsby/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22type%3A+documentation%22+label%3A%22good+first+issue%22) for your first time contributing to Gatsby, or ["documentation" and "help wanted"](https://github.com/gatsbyjs/gatsby/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22type%3A+documentation%22+label%3A%22help+wanted%22) to see all documentation issues that are ready for community help. Once you start a PR to address one of these issues, you can remove the "help wanted" label.

## Options for contributing to the Gatsby docs

When working on the Gatsby.js documentation, you can choose between two major styles of working:

- [Work directly in the GitHub UI](#modifying-markdown-files), using the "Edit this File" and commit capabilities without having to clone the repository. This is useful for quick documentation updates, typo fixes, and lightweight Markdown changes.
- Clone the Gatsby.js repo and get the `www` site up and running locally. This is necessary for more thorough documentation content and infrastructure changes. Learn how to get set up in the [Gatsby docs setup instructions](#docs-site-setup-instructions).

## Modifying markdown files

1. If you want to add/modify any Gatsby documentation, go to the
   [docs folder](https://github.com/gatsbyjs/gatsby/tree/master/docs) or [contributing folder](https://github.com/gatsbyjs/gatsby/tree/master/docs/contributing) on GitHub and
   use the file editor to edit and then preview your changes.
2. Before committing the change and raising a PR in the UI, you need to make sure the PR meets the docs contribution criteria:
   - Follow the standards outlined in the [Gatsby Style Guide](/contributing/gatsby-style-guide/).
   - If your PR did not come from an issue written by the core team, please add a comment to your PR that explains why it should be included in the docs, according to the [Docs Decision Tree](/blog/2018-10-12-uptick-docs-contributions-hacktoberfest/#docs-decision-tree-and-examples).
     > Note: If your issue and/or PR doesn't meet the above contribution criteria, it may receive a comment reminding you to do so. If, after two weeks, these updates haven't been made, your issue and/or PR may be closed, which helps us triage issues and PRs efficiently. You can request that it be reopened if and when you are ready to make the updates required.
3. GitHub then allows you to commit the change and raise a PR right in the UI. This is the _easiest_ way you can contribute to the project!

### Converting a document from a stub

If you wrote a new document that was [previously a stub](/contributing/how-to-write-a-stub/), there are two things you need to update.

1. Remove the frontmatter that links to the issue

```diff:title=docs/docs/example-doc.md
  ...
    title: Example Document
- - issue: https://github.com/gatsbyjs/gatsby/issues/00000
+ -
  ...
```

2. Edit `www/src/data/sidebars/doc-links.yaml` by removing the asterisk behind the document's title:

```diff:title=www/src/data/sidebars/doc-links.yaml
  ...
- - title: Example Document*
+ - title: Example Document
    link: /docs/example-document/
  ...
```

## Docs site setup instructions

After going through the development setup instructions above, there are a few additional things that are helpful to know when setting up the [Gatsby.js docs site](/docs/). which mostly lives in the [www](https://github.com/gatsbyjs/gatsby/tree/master/www) directory.

- Clone the Gatsby repo as described above.
- For docs-only changes, consider using `git checkout -b docs/some-change` or `git checkout -b docs-some-change`, as this will short circuit the CI process and only run linting tasks.
- Change directories into the docs site folder: `cd www`
- Install dependencies with Yarn: `yarn install`
- Add the following env variable to an `.env.development` file to [enable image placeholders](https://github.com/gatsbyjs/gatsby/tree/master/www#running-slow-build-screenshots-placeholder): `GATSBY_SCREENSHOT_PLACEHOLDER=true`. This will speed up building the docs site significantly!
- Start a build of `www` with `gatsby develop`.
- Edit Markdown files in the [docs](https://github.com/gatsbyjs/gatsby/tree/master/docs) and [contributing](https://github.com/gatsbyjs/gatsby/tree/master/docs/contributing) folders, as well as the [YAML sidebar files](https://github.com/gatsbyjs/gatsby/tree/master/www/src/data/sidebars).
- View the changes in your browser at `http://localhost:8000`.
- Commit your changes and submit a pull request!

## Claim your swag

After your first code contribution to the Gatsby repo (including documentation) you become eligible for a free shirt or pair of socks. See the [swag page](/contributing/contributor-swag/) for more details!

## Want more?

Check out our additional pages on docs contributions:

- [Gatsby Style Guide](/contributing/gatsby-style-guide/)
- [Docs Templates](/contributing/docs-templates/)
- [How to Write a Stub](/contributing/how-to-write-a-stub/)
