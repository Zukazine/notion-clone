describe('Counter Page Tests', () => {
    beforeEach(() => {
      cy.visit('/counter');
    });
  
    it('should display the Counter page with initial count of 0', () => {
      cy.contains('Click Count: 0').should('be.visible');
    });
  
    it('should increment the count when the Plus Me! button is clicked', () => {
      cy.contains('Plus Me!').click();
      cy.contains('Click Count: 1').should('be.visible');
    });
  
    it('should decrement the count when the Subtract Me! button is clicked', () => {
      cy.contains('Plus Me!').click(); // Increment first to avoid negative value in first check
      cy.contains('Subtract Me!').click();
      cy.contains('Click Count: 0').should('be.visible');
    });
  
    it('should navigate back to Home page when the back arrow is clicked', () => {
      cy.get('a[href="./"]').click({force: true});
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
  