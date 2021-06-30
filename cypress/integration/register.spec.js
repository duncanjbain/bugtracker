describe("Register Page", () => {
    beforeEach(() => {
        cy.visit("/signup");
      });
      it("successfully loads", () => {
        cy.get("[data-cy=cta-container]").contains("Bug Tracker");
        cy.get("[data-cy=name-label]").contains("Name");
        cy.get("[data-cy=email-label]").contains("Email Address");
        cy.get("[data-cy=password-label]").contains("Password");
        cy.get('[data-cy=confirmPassword-label]').contains("Confirm Password");
        cy.get("[data-cy=submit-register]").contains("Sign Up");
        cy.get("[data-cy=login-link]").contains("here");
        cy.get("[data-cy=login-link]")
          .should("have.attr", "href")
          .and("equal", "/login");
      });
      it('form validation - require fields', () => {
        cy.get('[data-cy=submit-register]').click();
        cy.get('#name-error').contains("A name is required");
        cy.get('#email-error').contains("An email address is required");
        cy.get('#password-error').contains("Password must be 6 characters");
      })
      it("form validation - form input requirements", () => {
        cy.get("[data-cy=email-input]").click().type("test");
        cy.get("[data-cy=submit-register]").click();
        cy.get("#email-error").contains("email must be a valid email");
        cy.get("#password-error").contains("Password must be 6 characters");
      });
      it("form validation - passwords must match", () => {
        cy.get("[data-cy=name-input]").click().type("User name");
        cy.get("[data-cy=email-input]").click().type("test@test.com");
        cy.get("[data-cy=password-input]").click().type("correct123");
        cy.get("[data-cy=confirmPassword-input]").click().type("wrong123");
        cy.get("[data-cy=submit-register]").click();
        cy.get('#confirmPassword-error').contains("Passwords must match");
      })
      it("form validation - successfully register", () => {
        cy.get("[data-cy=name-input]").click().type("Test User");
        cy.get("[data-cy=email-input]").click().type("testtwo@test.com");
        cy.get("[data-cy=password-input]").click().type("testingpassword");
        cy.get("[data-cy=confirmPassword-input]").click().type("testingpassword");
        cy.get("[data-cy=submit-register]").click();
        cy.location("pathname").should("include", "dashboard");
      })
})