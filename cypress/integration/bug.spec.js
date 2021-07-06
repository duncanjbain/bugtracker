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
  });

  it('bug - can update bug details', () => {
    cy.visit("/bug/BUG01");
    cy.get('[data-cy=edit-bug-button]').click()
    
  })
});
