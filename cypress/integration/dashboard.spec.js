describe("Dashboard Page", () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/dashboard')
    })
    it('Loads Page', () => {
        cy.location("pathname").should("include", "dashboard");
    })
})