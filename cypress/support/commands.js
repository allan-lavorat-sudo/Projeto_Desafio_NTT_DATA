/// <reference types="cypress" />

/**
 * Comando customizado para login no frontend
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 */
Cypress.Commands.add('loginFrontend', (email, password) => {
  cy.visit('/');
  cy.contains('Entrar').click();
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="entrar"]').click();
  cy.url().should('include', '/home');
});

/**
 * Comando customizado para fazer logout
 */
Cypress.Commands.add('logoutFrontend', () => {
  cy.get('[data-testid="logout"]').click();
  cy.url().should('include', '/');
});

/**
 * Comando customizado para criar usuário via API
 * @param {object} userData - Dados do usuário
 * @returns {object} Response da API
 */
Cypress.Commands.add('createUserAPI', (userData) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config().apiUrl}/usuarios`,
    body: userData,
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

/**
 * Comando customizado para fazer login via API
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {object} Response da API com token
 */
Cypress.Commands.add('loginAPI', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config().apiUrl}/login`,
    body: {
      email: email,
      password: password,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      // Armazenar token no localStorage para uso nos testes E2E
      window.localStorage.setItem('token', response.body.authorization);
    }
    return response;
  });
});

/**
 * Comando customizado para obter token de autenticação via API
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 */
Cypress.Commands.add('getAuthToken', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config().apiUrl}/login`,
    body: {
      email: email,
      password: password,
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('authorization');
    cy.wrap(response.body.authorization);
  });
});

/**
 * Comando customizado para adicionar produto ao carrinho (Frontend)
 * @param {string} productName - Nome do produto
 */
Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains(productName).parent().within(() => {
    cy.get('[data-testid="adicionar-carrinho"]').click();
  });
});

/**
 * Comando customizado para verificar notificação
 * @param {string} message - Mensagem esperada
 */
Cypress.Commands.add('checkNotification', (message) => {
  cy.get('.alert, .notification, [role="alert"]').should('contain', message);
});
