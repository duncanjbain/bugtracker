describe("Dashboard Page", () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/dashboard')
    })

    it('Navbar functions correctly', () => {
        cy.get("[data-cy=nav-dashboard]").click().location("pathname").should("include", "/dashboard");

        cy.get("[data-cy=nav-projects]").click().location("pathname").should("include", "/projects");

        cy.get("[data-cy=nav-bugs]").click().location("pathname").should("include", "/createbug");

        cy.get("[data-cy=nav-createproject]").click().location("pathname").should("include", "/createproject");

        cy.get("[data-cy=nav-profile]").click().location("pathname").should("include", "/profile");
    })

    it('projects - card has no projects initially displayed', () => {
        cy.get("[data-cy=projectcard-container]").contains('You currently do not have any projects added! Try addding one here!')
        cy.get('[data-cy=createproject-link]').click().location("pathname").should("include", "/createproject")
    })

})