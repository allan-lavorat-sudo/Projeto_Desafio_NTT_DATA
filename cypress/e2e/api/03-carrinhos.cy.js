/// <reference types="cypress" />
import { createTestAdmin, createTestUser } from '../../support/helpers/api-helpers';

describe('API - Carrinhos', () => {
  const API_BASE = 'https://serverest.dev';

  it('deve criar carrinho e concluir compra', () => {
    createTestAdmin().then((admin) => {
      const productData = {
        nome: `Produto Carrinho ${Date.now()}`,
        preco: 99,
        descricao: 'Produto para teste de carrinho',
        quantidade: 10,
      };

      cy.request({
        method: 'POST',
        url: `${API_BASE}/produtos`,
        headers: { Authorization: admin.token },
        body: productData,
      }).then((productResponse) => {
        const productId = productResponse.body._id;

        createTestUser().then((user) => {
          cy.request({
            method: 'POST',
            url: `${API_BASE}/carrinhos`,
            headers: { Authorization: user.token },
            body: {
              produtos: [
                {
                  idProduto: productId,
                  quantidade: 1,
                },
              ],
            },
          }).then((cartResponse) => {
            expect(cartResponse.status).to.equal(201);

            cy.request({
              method: 'DELETE',
              url: `${API_BASE}/carrinhos/concluir-compra`,
              headers: { Authorization: user.token },
            }).then((finishResponse) => {
              expect(finishResponse.status).to.equal(200);
              expect(finishResponse.body.message).to.match(/Registro exclu/i);
            });
          });
        });
      });
    });
  });
});
