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
    it('project - can view created project details', () => {
        cy.get('[data-cy=projectTable-projectLink-TEST01]').click().location("pathname").should("contains", "/project/TEST01");
        cy.get('[data-cy=projectTitle]').contains('Test Project')
        cy.get('[data-cy=projectLead-container]').contains('Test User')
        cy.get('[data-cy=projectMembers-container]').contains('Test User')
    })
    it('project - can add member to created project', () => {
        cy.visit('/project/TEST01')
        cy.get('[data-cy=addUser-button]').click()
        cy.get('[data-cy=user-select]').select('Second User')
        cy.get('[data-cy=submit-user]').click()
        cy.get('[data-cy=projectMembers-container]').contains('Second User')
    })
    it('project - can add a bug to created project', () => {
        cy.visit('/createbug')
        cy.get('[data-cy=projectName-select]').select('Test Project')
        cy.get('[data-cy=bugKey-input]').type('BUGKEY01')
        cy.get('[data-cy=bugType-select]').select('Enhancement')
        cy.get('[data-cy=bugSummary-textInput').type('Test Bug Summary')
        cy.get('.w-md-editor-text-input').type('Test bug description text')
        cy.get('.react-datepicker__input-container > input').click().get('.react-datepicker__day--001').click()
        cy.get('[data-cy=bugPriority-select]').select('High')
        cy.get('[data-cy=bugAssignedUser-select]').select('Test User')
        cy.get('[data-cy=bugAuthor-select]').select('Second User')
        cy.get('[data-cy=createBug-submit]').click()
        cy.location("pathname").should("include", "dashboard");
        cy.get('.react-toast-notifications__toast__content').contains('Bug successfully created!')

    })
})