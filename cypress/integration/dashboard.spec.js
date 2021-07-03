describe("Dashboard Page", () => {
    beforeEach(() => {
        cy.login('test@test.com','testing');
        cy.visit('/dashboard')
    })

    it('Navbar functions correctly', () => {
        cy.get("[data-cy=nav-dashboard]").click().location("pathname").should("include", "/dashboard");

        cy.get("[data-cy=nav-projects]").click().location("pathname").should("include", "/projects");

        cy.get("[data-cy=nav-bugs]").click().location("pathname").should("include", "/createbug");

        cy.get("[data-cy=nav-createproject]").click().location("pathname").should("include", "/createproject");

        cy.get("[data-cy=nav-profile]").click().location("pathname").should("include", "/profile");
    })
    it('can log out', () => {
        cy.get("[data-cy=nav-logout]").click()
        cy.contains('Log In')
    })

    it('cards are displayed', () => {
        cy.get("[data-cy=projectcard-container]").contains('My Projects')
        cy.get("[data-cy=bugscard-container]").contains('My Bugs')
        cy.get('[data-cy=createproject-link]').click().location("pathname").should("include", "/createproject")
    })

})