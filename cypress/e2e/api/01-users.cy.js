/// <reference types="cypress" />
import { createTestAdmin } from '../../support/helpers/api-helpers';

describe('API - Usuarios', () => {
  const API_BASE = 'https://serverest.dev';

  it('deve criar e buscar usuario por id', () => {
    const userData = {
      nome: `Usuario Teste ${Date.now()}`,
      email: `testuser_${Date.now()}@test.com`,
      password: 'senha123',
      administrador: 'false',
    };

    cy.request({
      method: 'POST',
      url: `${API_BASE}/usuarios`,
      body: userData,
    }).then((createResponse) => {
      expect(createResponse.status).to.equal(201);
      expect(createResponse.body).to.have.property('_id');

      const userId = createResponse.body._id;

      cy.request('GET', `${API_BASE}/usuarios/${userId}`).then((getResponse) => {
        expect(getResponse.status).to.equal(200);
        expect(getResponse.body.email).to.equal(userData.email);
      });
    });
  });

  it('deve autenticar admin criado dinamicamente', () => {
    createTestAdmin().then((admin) => {
      expect(admin.token).to.be.a('string').and.not.be.empty;
    });
  });
});
