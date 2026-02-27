/**
 * Utilitarios para testes E2E do Frontend
 */

export const performLogin = (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email"]').clear().type(email);
  cy.get('[data-testid="senha"]').clear().type(password);
  cy.get('[data-testid="entrar"]').click();
};

export const isUserLoggedIn = () => {
  return cy.url().then((url) => url.includes('/home'));
};

export const goToCart = () => {
  cy.get('[data-testid="carrinho"]').click();
  cy.url().should('include', '/carrinho');
};

export const isProductVisible = (productName) => {
  cy.contains(productName).should('be.visible');
};

export const addProductToCart = (productName) => {
  cy.contains(productName)
    .closest('div.card, .card, .product, .row, li')
    .find('[data-testid="adicionarNaLista"], [data-testid="adicionar-carrinho"]')
    .first()
    .click();
};

export const removeFromCart = () => {
  cy.get('[data-testid="excluir"], [data-testid="remover"]').first().click();
};

export const verifySuccess = (message) => {
  cy.contains(message, { timeout: 5000 }).should('be.visible');
};

export const verifyError = (message) => {
  cy.contains(message, { timeout: 5000 }).should('be.visible');
};
