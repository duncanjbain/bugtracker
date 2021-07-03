describe("Profile", () => {
    it('profile - displays current user information as placeholders', () => {
        cy.login('third@test.com','testing');
        cy.visit('/profile')
        cy.get('[data-cy=name-input').should("have.attr", "placeholder").and("equal", "Third User");
        cy.get('[data-cy=email-input]').should("have.attr", "placeholder").and("equal", "third@test.com");
        cy.get('[data-cy=password-input]').should("have.attr", "placeholder").and("equal", "Enter new password");
        cy.get('[data-cy=confirmPassword-input]').should("have.attr", "placeholder").and("equal", "Confirm new password");
    })
    it('profile - can update username', () => {
        cy.login('third@test.com','testing');
        cy.visit('/profile')
        cy.get('[data-cy=name-input').type('Updated Username')
        cy.get('[data-cy=profile-submit]').click()
        cy.reload()
        cy.get('[data-cy=name-input').should("have.attr", "placeholder").and("equal", "Updated Username");
    })
    it('profile - can update email', () => {
        cy.login('third@test.com','testing');
        cy.visit('/profile')
        cy.get('[data-cy=email-input]').type('updated@test.com')
        cy.get('[data-cy=profile-submit]').click()
        cy.reload()
        cy.get('[data-cy=email-input]').should("have.attr", "placeholder").and("equal", "updated@test.com");
    })
    it('profile - can update password', () => {
        cy.login('updated@test.com','testing');
        cy.visit('/profile')
        cy.get('[data-cy=password-input]').type('updated')
        cy.get('[data-cy=confirmPassword-input]').type('updated')
    })

})