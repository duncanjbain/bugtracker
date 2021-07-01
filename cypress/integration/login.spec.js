describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("successfully loads", () => {
    cy.get("[data-cy=cta-container]").contains("Bug Tracker");
    cy.get("[data-cy=email-label]").contains("Email");
    cy.get("[data-cy=password-label]").contains("Password");
    cy.get("[data-cy=submit-login]").contains("Log In");
    cy.get("[data-cy=signup-link]").contains("Sign up");
    cy.get("[data-cy=signup-link]")
      .should("have.attr", "href")
      .and("equal", "/signup/");
  });
  it("form validation - required fields", () => {
    cy.get("[data-cy=submit-login]").click();
    cy.get("#email-error").contains("Email address is required");
    cy.get("#password-error").contains("Password is required");
  });
  it("form validation - form input requirements", () => {
    cy.get("[data-cy=email-input]").click().type("test");
    cy.get("[data-cy=submit-login]").click();
    cy.get("#email-error").contains("email must be a valid email");
    cy.get("#password-error").contains("Password is required");
    cy.reload();
    cy.get("[data-cy=email-input]").click().type("test@test.com");
    cy.get("[data-cy=submit-login]").click();
    cy.get("#email-error").should("not.exist");
    cy.get("#password-error").contains("Password is required");
  });
  it("form validation - cannot login without correct email and password", () => {
    cy.get("[data-cy=email-input]").click().type("test@test.com");
    cy.get("[data-cy=password-input]").click().type("test");
    cy.get("[data-cy=submit-login]").click();
    cy.get("#login-error").contains("Invalid email or password");
  });
  it("form validation - logs in with correct email and password", () => {
    cy.get("[data-cy=email-input]").click().type("test@test.com");
    cy.get("[data-cy=password-input]").click().type("testing");
    cy.get("[data-cy=submit-login]").click();
    cy.wait(5000)
    cy.location("pathname").should("include", "dashboard");
  });
});
