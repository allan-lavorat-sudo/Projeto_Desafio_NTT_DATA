/// <reference types="cypress" />

describe('Frontend E2E - Protecao de rota', () => {
  it('deve redirecionar para login ao acessar home sem autenticacao', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/home');

    cy.url().should('include', '/login');
    cy.get('[data-testid="entrar"]').should('be.visible');
  });
});
