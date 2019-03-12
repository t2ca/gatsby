beforeEach(() => {
  cy.visit(`/static-query/`).waitForAPIorTimeout(`onRouteUpdate`)
})

describe(`StaticQuery behavior`, () => {
  it(`works with inline query`, () => {
    cy.getTestElement(`inline`)
      .invoke(`text`)
      .should(`not.contain`, `Loading`)
  })

  it(`works with variable query`, () => {
    cy.getTestElement(`variable`)
      .invoke(`text`)
      .should(`not.contain`, `Loading`)
  })

  it(`works with exported variable query`, () => {
    cy.getTestElement(`exported`)
      .invoke(`text`)
      .should(`not.contain`, `Loading`)
  })

  describe(`useStaticQuery`, () => {
    it(`works with inline query`, () => {
      cy.getTestElement(`use-static-query-inline`)
        .invoke(`text`)
        .should(`not.contain`, `Error`)
    })

    it(`works with variable query`, () => {
      cy.getTestElement(`use-static-query-variable`)
        .invoke(`text`)
        .should(`not.contain`, `Error`)
    })

    it(`works with exported variable query`, () => {
      cy.getTestElement(`use-static-query-exported`)
        .invoke(`text`)
        .should(`not.contain`, `Error`)
    })

    it(`works with destructuring`, () => {
      cy.getTestElement(`use-static-query-destructuring`)
        .find(`li`)
        .should(`have.length.gte`, 1)
    })
  })
})
