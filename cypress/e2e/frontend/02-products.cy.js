/// <reference types="cypress" />

describe('Frontend E2E - Login invalido', () => {
  it('deve manter usuario fora da home ao informar credenciais invalidas', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type('usuario_invalido@qa.com');
    cy.get('[data-testid="senha"]').type('senha-invalida');
    cy.get('[data-testid="entrar"]').click();

    cy.url().should('not.include', '/home');
    cy.contains(/email|senha|inv[aá]lid/i).should('be.visible');
  });
});
