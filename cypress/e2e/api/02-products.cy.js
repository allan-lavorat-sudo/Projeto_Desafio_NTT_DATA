/// <reference types="cypress" />
import { createTestAdmin } from '../support/helpers/api-helpers';

describe('API - Gerenciamento de Produtos', () => {
  /**
   * OBJETIVO: Validar operações CRUD de produtos na API
   * 
   * CENÁRIOS:
   * 1. Criar novo produto (admin)
   * 2. Listar produtos
   * 3. Buscar produto por ID
   * 4. Editar produto (admin)
   * 5. Deletar produto (admin)
   */

  const API_BASE = 'https://api.serverest.dev';
  let adminToken = null;
  let adminUser = null;

  before(() => {
    // Criar admin para testes que requerem autenticação
    createTestAdmin().then((admin) => {
      adminToken = admin?.token;
      adminUser = admin;
      cy.log(`✅ Admin criado: ${admin?.email}`);
    });
  });

  it('📦 Deve criar um novo produto como administrador', () => {
    // ASSERT - Verificar que temos admin token
    expect(adminToken).to.not.be.empty;

    // ARRANGE
    const productData = {
      nome: `Produto Teste ${Date.now()}`,
      preco: 199.99,
      descricao: 'Descrição do produto de teste',
      quantidade: 50,
    };

    // ACT
    cy.request({
      method: 'POST',
      url: `${API_BASE}/produtos`,
      headers: {
        Authorization: adminToken,
      },
      body: productData,
      failOnStatusCode: false,
    }).then((response) => {
      // ASSERT
      expect(response.status).to.equal(201);
      cy.log('✓ Status 201 retornado');

      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      cy.log('✓ Produto criado com sucesso');

      expect(response.body._id).to.be.a('string');
      cy.log(`✓ ID do produto: ${response.body._id}`);

      expect(response.body).to.have.property('Nome', productData.nome);
      cy.log(`✓ Nome do produto: ${productData.nome}`);
    });
  });

  it('🛍️ Deve listar todos os produtos', () => {
    // ARRANGE & ACT
    cy.request({
      method: 'GET',
      url: `${API_BASE}/produtos`,
      failOnStatusCode: false,
    }).then((response) => {
      // ASSERT
      expect(response.status).to.equal(200);
      cy.log('✓ Status 200 retornado');

      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('produtos');
      cy.log('✓ Resposta tem estrutura correta');

      expect(response.body.produtos).to.be.an('array');
      expect(response.body.produtos.length).to.be.greaterThan(0);
      cy.log(`✓ ${response.body.quantidade} produtos listados`);

      // Verificar estrutura de cada produto
      response.body.produtos.forEach((product) => {
        expect(product).to.have.property('_id');
        expect(product).to.have.property('nome');
        expect(product).to.have.property('preco');
        expect(product).to.have.property('descricao');
      });
      cy.log('✓ Todos os produtos possuem estrutura válida');
    });
  });

  it('🔍 Deve buscar produto por ID', () => {
    // ARRANGE - Listar produtos para obter um ID válido
    cy.request({
      method: 'GET',
      url: `${API_BASE}/produtos`,
    }).then((listResponse) => {
      if (listResponse.body.produtos.length > 0) {
        const productId = listResponse.body.produtos[0]._id;
        const productName = listResponse.body.produtos[0].nome;

        // ACT
        cy.request({
          method: 'GET',
          url: `${API_BASE}/produtos/${productId}`,
          failOnStatusCode: false,
        }).then((response) => {
          // ASSERT
          expect(response.status).to.equal(200);
          cy.log('✓ Status 200 retornado');

          expect(response.body).to.have.property('_id', productId);
          expect(response.body).to.have.property('nome', productName);
          cy.log(`✓ Produto encontrado: ${productName}`);

          expect(response.body).to.have.property('preco');
          expect(response.body).to.have.property('descricao');
          cy.log('✓ Produto possui todas as informações');
        });
      }
    });
  });

  it('✏️ Deve editar produto como administrador', () => {
    // ASSERT - Verificar que temos admin
    expect(adminToken).to.not.be.empty;

    // ARRANGE - Criar produto para editar
    const originalData = {
      nome: `Produto Original ${Date.now()}`,
      preco: 100.00,
      descricao: 'Descrição original',
      quantidade: 10,
    };

    cy.request({
      method: 'POST',
      url: `${API_BASE}/produtos`,
      headers: {
        Authorization: adminToken,
      },
      body: originalData,
    }).then((createResponse) => {
      const productId = createResponse.body._id;
      cy.log(`✓ Produto criado: ${productId}`);

      // ACT
      const updatedData = {
        nome: `Produto Atualizado ${Date.now()}`,
        preco: 150.00,
        descricao: 'Descrição atualizada',
        quantidade: 20,
      };

      cy.request({
        method: 'PUT',
        url: `${API_BASE}/produtos/${productId}`,
        headers: {
          Authorization: adminToken,
        },
        body: updatedData,
        failOnStatusCode: false,
      }).then((updateResponse) => {
        // ASSERT
        expect(updateResponse.status).to.equal(200);
        cy.log('✓ Status 200 retornado');

        expect(updateResponse.body).to.have.property('message', 'Registro alterado com sucesso');
        cy.log('✓ Mensagem de sucesso recebida');

        // Verificar atualização usando GET
        cy.request({
          method: 'GET',
          url: `${API_BASE}/produtos/${productId}`,
        }).then((getResponse) => {
          expect(getResponse.body.nome).to.include('Produto Atualizado');
          cy.log('✓ Nome do produto atualizado');

          expect(getResponse.body.preco).to.equal(150.00);
          cy.log('✓ Preço do produto atualizado');
        });
      });
    });
  });

  it('🗑️ Deve deletar produto como administrador', () => {
    // ASSERT - Verificar que temos admin
    expect(adminToken).to.not.be.empty;

    // ARRANGE - Criar produto para deletar
    const deleteTestData = {
      nome: `Produto Para Deletar ${Date.now()}`,
      preco: 50.00,
      descricao: 'Produto de teste para deleção',
      quantidade: 5,
    };

    cy.request({
      method: 'POST',
      url: `${API_BASE}/produtos`,
      headers: {
        Authorization: adminToken,
      },
      body: deleteTestData,
    }).then((createResponse) => {
      const productId = createResponse.body._id;
      cy.log(`✓ Produto criado: ${productId}`);

      // ACT
      cy.request({
        method: 'DELETE',
        url: `${API_BASE}/produtos/${productId}`,
        headers: {
          Authorization: adminToken,
        },
        failOnStatusCode: false,
      }).then((deleteResponse) => {
        // ASSERT
        expect(deleteResponse.status).to.equal(200);
        cy.log('✓ Status 200 retornado');

        expect(deleteResponse.body).to.have.property('message', 'Registro excluído com sucesso');
        cy.log('✓ Produto deletado com sucesso');

        // Verificar que foi realmente deletado
        cy.request({
          method: 'GET',
          url: `${API_BASE}/produtos/${productId}`,
          failOnStatusCode: false,
        }).then((getResponse) => {
          expect(getResponse.status).to.equal(400);
          cy.log('✓ Produto não pode mais ser encontrado');
        });
      });
    });
  });
});
