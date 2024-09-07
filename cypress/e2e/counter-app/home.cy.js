describe('Home Page Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should display the Home page and the link to Counter page', () => {
      cy.contains('Aku mau ngitung Paaa !!').should('be.visible');
    });
  
    it('should navigate to the Counter page when the link is clicked', () => {
      cy.contains('Aku mau ngitung Paaa !!').click();
      cy.url().should('include', '/counter');
    });
  });
  