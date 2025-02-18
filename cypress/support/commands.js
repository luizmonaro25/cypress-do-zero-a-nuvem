Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Felipe',
    lastName: 'Teste',
    email: 'email@exemplo.com.br',
    text: 'test.'
}) => {
    cy.get('#firstName').should('be.visible').type(data.firstName)
    cy.get('#lastName').should('be.visible').type(data.lastName)
    cy.get('#email').should('be.visible').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})