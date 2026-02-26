/// <reference types="cypress" />
import { createTestUser, createTestAdmin } from '../support/helpers/api-helpers';

describe('API - Gerenciamento de Carrinhos', () => {
  /**
   * OBJETIVO: Validar operações com carrinhos na API
   * 
   * CENÁRIOS:
   * 1. Criar carrinho
   * 2. Listar carrinhos
   * 3. Buscar carrinho por ID
   * 4. Concluir compra (finalizar carrinho)
   * 5. Cancelar compra (remover carrinho e retornar produtos)
   */

  const API_BASE = 'https://api.serverest.dev';
  let userToken = null;
  let adminToken = null;
  let testProductId = null;

  before(() => {
    // Criar admin para criar produto de teste
    createTestAdmin().then((admin) => {
      adminToken = admin?.token;
      cy.log(`✅ Admin criado`);

      // Criar um produto para usar nos carrinhos
      const productData = {
        nome: `Produto Carrinho ${Date.now()}`,
        preco: 99.99,
        descricao: 'Produto para teste de carrinho',
        quantidade: 100,
      };

      cy.request({
        method: 'POST',
        url: `${API_BASE}/produtos`,
        headers: {
          Authorization: adminToken,
        },
        body: productData,
      }).then((response) => {
        testProductId = response.body._id;
        cy.log(`✅ Produto criado: ${testProductId}`);
      });
    });

    // Criar usuário para testes
    createTestUser().then((user) => {
      userToken = user?.token;
      cy.log(`✅ Usuário criado`);
    });
  });

  it('🛒 Deve criar um carrinho com sucesso', () => {
    // ASSERT - Verificar dados de teste
    expect(userToken).to.not.be.empty;
    expect(testProductId).to.not.be.empty;

    // ARRANGE
    const cartData = {
      idProduto: testProductId,
      quantidade: 2,
    };

    // ACT
    cy.request({
      method: 'POST',
      url: `${API_BASE}/carrinhos`,
      headers: {
        Authorization: userToken,
      },
      body: cartData,
      failOnStatusCode: false,
    }).then((response) => {
      // ASSERT
      expect(response.status).to.equal(201);
      cy.log('✓ Status 201 retornado');

      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      cy.log('✓ Mensagem de sucesso recebida');

      expect(response.body).to.have.property('_id');
      cy.log(`✓ Carrinho criado com ID: ${response.body._id}`);
    });
  });

  it('📋 Deve listar todos os carrinhos', () => {
    // ARRANGE & ACT
    cy.request({
      method: 'GET',
      url: `${API_BASE}/carrinhos`,
      failOnStatusCode: false,
    }).then((response) => {
      // ASSERT
      expect(response.status).to.equal(200);
      cy.log('✓ Status 200 retornado');

      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('carrinhos');
      cy.log('✓ Resposta tem estrutura correta');

      expect(response.body.carrinhos).to.be.an('array');
      cy.log(`✓ ${response.body.quantidade} carrinhos listados`);

      // Verificar estrutura de cada carrinho
      if (response.body.carrinhos.length > 0) {
        response.body.carrinhos.forEach((cart) => {
          expect(cart).to.have.property('_id');
          expect(cart).to.have.property('produtos');
        });
        cy.log('✓ Todos os carrinhos possuem estrutura válida');
      }
    });
  });

  it('🔍 Deve buscar carrinho por ID', () => {
    // ASSERT - Verificar dados
    expect(userToken).to.not.be.empty;
    expect(testProductId).to.not.be.empty;

    // ARRANGE - Criar um carrinho
    const cartData = {
      idProduto: testProductId,
      quantidade: 1,
    };

    cy.request({
      method: 'POST',
      url: `${API_BASE}/carrinhos`,
      headers: {
        Authorization: userToken,
      },
      body: cartData,
    }).then((createResponse) => {
      const cartId = createResponse.body._id;
      cy.log(`✓ Carrinho criado: ${cartId}`);

      // ACT
      cy.request({
        method: 'GET',
        url: `${API_BASE}/carrinhos/${cartId}`,
        failOnStatusCode: false,
      }).then((getResponse) => {
        // ASSERT
        expect(getResponse.status).to.equal(200);
        cy.log('✓ Status 200 retornado');

        expect(getResponse.body).to.have.property('_id', cartId);
        expect(getResponse.body).to.have.property('produtos');
        cy.log('✓ Carrinho encontrado com dados completos');

        expect(getResponse.body.produtos).to.be.an('array');
        expect(getResponse.body.produtos.length).to.be.greaterThan(0);
        cy.log(`✓ Carrinho contém ${getResponse.body.produtos.length} produto(s)`);
      });
    });
  });

  it('✅ Deve concluir compra (finalizar carrinho)', () => {
    // ASSERT - Verificar dados
    expect(userToken).to.not.be.empty;
    expect(testProductId).to.not.be.empty;

    // ARRANGE - Criar um carrinho
    const cartData = {
      idProduto: testProductId,
      quantidade: 1,
    };

    cy.request({
      method: 'POST',
      url: `${API_BASE}/carrinhos`,
      headers: {
        Authorization: userToken,
      },
      body: cartData,
    }).then((createResponse) => {
      cy.log('✓ Carrinho criado para conclusão');

      // ACT
      cy.request({
        method: 'DELETE',
        url: `${API_BASE}/carrinhos/concluir-compra`,
        headers: {
          Authorization: userToken,
        },
        failOnStatusCode: false,
      }).then((response) => {
        // ASSERT
        expect(response.status).to.equal(200);
        cy.log('✓ Status 200 retornado');

        expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
        cy.log('✓ Compra concluída com sucesso');

        expect(response.body).to.have.property('quantidadeComprada');
        cy.log(`✓ Quantidade comprada: ${response.body.quantidadeComprada}`);
      });
    });
  });

  it('❌ Deve cancelar compra (remover carrinho e retornar estoque)', () => {
    // ASSERT - Verificar dados
    expect(userToken).to.not.be.empty;
    expect(testProductId).to.not.be.empty;

    // ARRANGE - Obter quantidade inicial do produto
    let initialQty = 0;
    cy.request({
      method: 'GET',
      url: `${API_BASE}/produtos/${testProductId}`,
    }).then((getResponse) => {
      initialQty = getResponse.body.quantidade;
      cy.log(`✓ Quantidade inicial do produto: ${initialQty}`);

      // Criar um novo carrinho
      const cartData = {
        idProduto: testProductId,
        quantidade: 2,
      };

      cy.request({
        method: 'POST',
        url: `${API_BASE}/carrinhos`,
        headers: {
          Authorization: userToken,
        },
        body: cartData,
      }).then((createResponse) => {
        cy.log('✓ Carrinho criado para cancelamento');

        // ACT
        cy.request({
          method: 'DELETE',
          url: `${API_BASE}/carrinhos/cancelar-compra`,
          headers: {
            Authorization: userToken,
          },
          failOnStatusCode: false,
        }).then((response) => {
          // ASSERT
          expect(response.status).to.equal(200);
          cy.log('✓ Status 200 retornado');

          expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
          cy.log('✓ Compra cancelada com sucesso');

          // Verificar que o estoque foi retornado
          cy.request({
            method: 'GET',
            url: `${API_BASE}/produtos/${testProductId}`,
          }).then((finalResponse) => {
            const finalQty = finalResponse.body.quantidade;
            // A quantidade final deve ser igual à inicial (estoque foi retornado)
            expect(finalQty).to.be.greaterThanOrEqual(initialQty);
            cy.log(`✓ Estoque retornado: ${finalQty}`);
          });
        });
      });
    });
  });
});
