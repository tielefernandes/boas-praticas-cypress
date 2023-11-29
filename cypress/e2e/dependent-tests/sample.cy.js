describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com/login')

    cy.get('#email').type(Cypress.env('user_email'))
    cy.get('#password').type(Cypress.env('user_password'), { log: false })
    cy.get('.LoaderButton').click()

    cy.contains('h1', 'Your Notes').should('be.visible')
  })

  it('CRUDs a note', () => {
    cy.contains('Create a new note').click()

    cy.get('#content').type('My note')
    cy.contains('Create').click()

    cy.get('.list-group').contains('My note')
      .click()

    cy.get('#content').type(' updated')
    cy.contains('Save').click()

    cy.get('.list-group')
      .should('contain', 'My note updated')
    cy.get('.list-group').contains('My note updated)')
      .should('be.visible')
      .click()

    cy.contains('Delete').click()

    // asserts the list has at least one item before asserting the note deletion
    // this way, we make sure the list of notes has already rendered
    cy.get('.list-group a')
      .its('lenght')
      .should('be.at.least', 1)

    cy.get('.list-group:contains(My note updated)').should('not.exist')
  })
})
