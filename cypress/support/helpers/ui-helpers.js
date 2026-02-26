/**
 * Utilitários para testes E2E do Frontend
 */

/**
 * Realiza login no frontend
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 */
export const performLogin = (email, password) => {
  cy.visit('/');
  
  // Aguardar a página carregar
  cy.contains('Entrar', { timeout: 10000 }).should('be.visible');
  cy.contains('Entrar').click();
  
  // Preencher credenciais
  cy.get('[data-testid="email"]').clear().type(email);
  cy.get('[data-testid="password"]').clear().type(password);
  
  // Fazer login
  cy.get('[data-testid="entrar"]').click();
};

/**
 * Verifica se o usuário está logado
 * @returns {boolean}
 */
export const isUserLoggedIn = () => {
  return cy.url().then((url) => {
    return url.includes('/home');
  });
};

/**
 * Navega até o carrinho
 */
export const goToCart = () => {
  cy.get('[data-testid="carrinho"]').click();
  cy.url().should('include', '/carrinho');
};

/**
 * Verifica se um produto está visível na página
 * @param {string} productName - Nome do produto
 */
export const isProductVisible = (productName) => {
  cy.contains(productName).should('be.visible');
};

/**
 * Adiciona um produto ao carrinho
 * @param {string} productName - Nome do produto
 */
export const addProductToCart = (productName) => {
  cy.contains(productName).parent().within(() => {
    cy.get('[data-testid="adicionar-carrinho"]').click();
  });
};

/**
 * Remove um item do carrinho
 * @param {string} itemName - Nome do item
 */
export const removeFromCart = (itemName) => {
  cy.contains(itemName).parent().within(() => {
    cy.get('[data-testid="remover"]').click();
  });
};

/**
 * Aguarda e verifica sucesso na ação
 * @param {string} message - Mensagem de sucesso esperada
 */
export const verifySuccess = (message) => {
  cy.contains(message, { timeout: 5000 }).should('be.visible');
};

/**
 * Aguarda e verifica erro na ação
 * @param {string} message - Mensagem de erro esperada
 */
export const verifyError = (message) => {
  cy.contains(message, { timeout: 5000 }).should('be.visible');
};
