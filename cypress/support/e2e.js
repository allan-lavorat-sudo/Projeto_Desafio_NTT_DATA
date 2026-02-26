// Import commands.js
import './commands';

// Disable uncaught exception handling for 3rd party error events
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false para impedir que Cypress falhe o teste
  return false;
});

// Hook para logs de início de testes
beforeEach(() => {
  cy.log(`📝 Iniciando teste: ${Cypress.currentTest.title}`);
});

// Hook para logs de fim de testes
afterEach(() => {
  cy.log(`✅ Finalizando teste: ${Cypress.currentTest.title}`);
});
