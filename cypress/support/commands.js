// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", () => {
  const LOGIN_USER_MUTATION = `
    mutation loginUser {
      loginUser(email: "test@test.com", password: "testing") {
        token
        user {
          id
        }
      }
    }
  `;

  // create the user first in the DB
  cy.request({
    url: "http://localhost:4000/graphql",
    method: "POST",
    body: { query: LOGIN_USER_MUTATION },
  })
    .its("body")
    .then((body) => {
      // assuming the server sends back the user details
      // including a randomly generated password
      //
      // we can now login as this newly created user
      window.localStorage.setItem("AUTH_TOKEN", body.data.loginUser.token);
      cy.log(body)
      cy.log(window.localStorage.AUTH_TOKEN)
    });
});