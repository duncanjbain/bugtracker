describe("Bugs", () => {
  beforeEach(() => {
    cy.login("project@test.com", "testing");
  });
  it("bug - can view bug details", () => {
    cy.visit("/bug/BUG01");
    cy.get("[data-cy=bug-details-header]").contains("Bug Details");
    cy.get("[data-cy=bug-summary]").contains("A");
    cy.get("[data-cy=bug-description]").contains("First bug description");
    cy.get("[data-cy=bug-assignee-link]").contains("Project User");
    cy.get("[data-cy=bug-author-link]").contains("Project User");
    cy.get('[data-cy=bug-date-due]').contains("Due On Friday, 1 January 2021")
    const date = new Date(parseInt(Date.now(), 10));
    const createdOn = date.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    cy.log(createdOn)
    cy.get('[data-cy=bug-date-created]').contains(createdOn)
    cy.get('[data-cy=edit-bug-button]').contains('Edit')
    cy.get('[data-cy=edit-bug-button]').click()
    cy.get('[data-cy=delete-button]').contains('Delete Bug')
    cy.get('[data-cy=delete-button]').click()
    cy.get('[data-cy=delete-confirm]').contains('Yes')
    cy.get('[data-cy=delete-abort]').contains('No')
  });

  it('bug - can update bug details', () => {
    cy.visit("/bug/BUG01");
    cy.get('[data-cy=edit-bug-button]').click()
    cy.get('#key').should("have.attr", "placeholder").and("equal", "BUG01");
    cy.get('#type').find('option:selected').should('have.text', 'Defect')
    cy.get('#summary').should("have.attr", "placeholder").and("equal", "A");
    cy.get('.w-md-editor-text-input').contains('First bug description')
    cy.get('#priority').find('option:selected').should('have.text', 'Low')
    cy.get('#assignee').find('option:selected').should('have.text', 'Project User')
    cy.get('#author').find('option:selected').should('have.text', 'Project User')
    cy.get('#summary').type('Updated Bug Summary')
    cy.get('.w-md-editor-text-input').clear().type('Updated Bug Description')
    cy.get('[data-cy=update-button]').click()
    cy.visit("/bug/BUG01");
    cy.get("[data-cy=bug-summary]").contains("Updated Bug Summary");
    cy.get("[data-cy=bug-description]").contains("Updated Bug Description");
  })
  it('bug - can delete bug', () => {
    cy.visit("/bug/BUG01");
    cy.get('[data-cy=edit-bug-button]').click()
    cy.get('[data-cy=delete-button]').click()
    cy.get('[data-cy=delete-confirm]').click()
    cy.get('.react-toast-notifications__toast__content').contains('Bug successfully deleted!')
  })
});
