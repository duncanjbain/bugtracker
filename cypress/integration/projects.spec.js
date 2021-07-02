describe("Projects", () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/dashboard')
    })

    it('project - form validation', () => {
        cy.visit('/createproject')
        cy.get("[data-cy=form-submit").click()
        cy.get('#projectName-error').contains('A project name is required')
        cy.get('#projectKey-error').contains('A project key is required')
    })

    it('project - can create project', () => {
        cy.visit('/createproject')
        cy.get('[data-cy=projectName-input]').click().type('Test Project')
        cy.get('[data-cy=projectKey-input]').click().type('TEST01')
        cy.get("[data-cy=form-submit").click()
        cy.get("[data-cy=projectTable]").contains('TEST01')
    })
})