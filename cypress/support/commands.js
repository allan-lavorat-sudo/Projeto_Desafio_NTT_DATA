/// <reference types="cypress" />

Cypress.Commands.add('loginFrontend', (email, password) => {
  cy.visit('/');
  cy.contains('Entrar').click();
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="senha"]').type(password);
  cy.get('[data-testid="entrar"]').click();
  cy.url().should('include', '/home');
});

Cypress.Commands.add('logoutFrontend', () => {
  cy.get('[data-testid="logout"]').click();
  cy.url().should('include', '/login');
});

Cypress.Commands.add('createUserAPI', (userData) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/usuarios`,
    body: userData,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('loginAPI', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: {
      email,
      password,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('getAuthToken', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: {
      email,
      password,
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('authorization');
    return response.body.authorization;
  });
});

Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains('[data-testid="nome-produto"]', productName)
    .closest('div.card, .card, .product, .row, li')
    .find('[data-testid="adicionarNaLista"], [data-testid="adicionar-carrinho"]')
    .first()
    .click();
});

Cypress.Commands.add('checkNotification', (message) => {
  cy.contains(message).should('be.visible');
});
