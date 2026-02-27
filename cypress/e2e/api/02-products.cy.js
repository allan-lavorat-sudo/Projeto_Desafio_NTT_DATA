/// <reference types="cypress" />
import { createTestAdmin } from '../../support/helpers/api-helpers';

describe('API - Produtos', () => {
  const API_BASE = 'https://serverest.dev';

  it('deve criar e consultar produto com token admin', () => {
    createTestAdmin().then((admin) => {
      const productData = {
        nome: `Produto Teste ${Date.now()}`,
        preco: 199,
        descricao: 'Descricao do produto de teste',
        quantidade: 50,
      };

      cy.request({
        method: 'POST',
        url: `${API_BASE}/produtos`,
        headers: { Authorization: admin.token },
        body: productData,
      }).then((createResponse) => {
        expect(createResponse.status).to.equal(201);
        expect(createResponse.body).to.have.property('_id');

        const productId = createResponse.body._id;

        cy.request('GET', `${API_BASE}/produtos/${productId}`).then((getResponse) => {
          expect(getResponse.status).to.equal(200);
          expect(getResponse.body.nome).to.equal(productData.nome);
          expect(getResponse.body.preco).to.equal(productData.preco);
        });
      });
    });
  });
});
