/// <reference types="cypress" />

describe('Frontend E2E - Autenticacao', () => {
  it('deve realizar login com credenciais validas', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type('fulano@qa.com');
    cy.get('[data-testid="senha"]').type('teste');
    cy.get('[data-testid="entrar"]').click();

    cy.url().should('include', '/home');
  });
});
