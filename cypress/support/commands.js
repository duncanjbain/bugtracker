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
Cypress.Commands.add("login", (email = "test@test.com", password="testing") => {
  const LOGIN_USER_MUTATION = `
    mutation loginUser($email: String! $password: String!) {
      loginUser(email: $email, password: $password) {
        token
        user {
          id
        }
      }
    }
  `;

  cy.request({
    url: "http://localhost:4000/graphql",
    method: "POST",
    body: { query: LOGIN_USER_MUTATION, variables: {email, password} },
  })
    .its("body")
    .then((body) => {
      window.localStorage.setItem("AUTH_TOKEN", body.data.loginUser.token);
    });
});
