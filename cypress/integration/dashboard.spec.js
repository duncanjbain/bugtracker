describe("Dashboard Page", () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/dashboard')
    })

    it('Navbar functions correctly', () => {
        cy.get("[data-cy=nav-dashboard]")
        .should("have.attr", "href")
        .and("equal", "/dashboard");
        cy.get("[data-cy=nav-dashboard]").click().location("pathname").should("include", "/dashboard");

        cy.get("[data-cy=nav-projects]")
        .should("have.attr", "href")
        .and("equal", "/projects");
        cy.get("[data-cy=nav-projects]").click().location("pathname").should("include", "/projects");

        cy.get("[data-cy=nav-bugs]")
        .should("have.attr", "href")
        .and("equal", "/createbug");
        cy.get("[data-cy=nav-bugs]").click().location("pathname").should("include", "/createbug");

        cy.get("[data-cy=nav-createproject]")
        .should("have.attr", "href")
        .and("equal", "/createproject");
        cy.get("[data-cy=nav-createproject]").click().location("pathname").should("include", "/createproject");

        cy.get("[data-cy=nav-profile]")
        .should("have.attr", "href")
        .and("equal", "/profile");
        cy.get("[data-cy=nav-profile]").click().location("pathname").should("include", "/profile");
    })
})