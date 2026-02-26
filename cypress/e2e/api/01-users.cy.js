/// <reference types="cypress" />
import { createTestAdmin, createTestUser } from '../support/helpers/api-helpers';

describe('API - Gerenciamento de Usuários', () => {
  /**
   * OBJETIVO: Validar operações CRUD de usuários na API
   * 
   * CENÁRIOS:
   * 1. Criar novo usuário
   * 2. Listar usuários
   * 3. Buscar usuário por ID
   * 4. Editar usuário
   * 5. Deletar usuário
   */

  const API_BASE = 'https://api.serverest.dev';
  let testUserId = null;
  let adminToken = null;

  before(() => {
    // Criar um admin para testes que requerem autenticação
    createTestAdmin().then((admin) => {
      adminToken = admin?.token;
      cy.log(`✅ Admin criado para testes: ${admin?.email}`);
    });
  });

  it('👤 Deve criar um novo usuário com sucesso', () => {
    // ARRANGE
    const userData = {
      nome: `Usuário Teste ${Date.now()}`,
      email: `testuser_${Date.now()}@test.com`,
      password: 'senha123',
      administrador: 'false',
    };

    // ACT
    cy.request({
      method: 'POST',
      url: `${API_BASE}/usuarios`,
      body: userData,
      failOnStatusCode: false,
    }).then((response) => {
      // ASSERT
      expect(response.status).to.equal(201);
      cy.log('✓ Status 201 retornado');

      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      cy.log('✓ Resposta contém ID e mensagem de sucesso');

      testUserId = response.body._id;
      cy.log(`✓ Usuário criado com ID: ${testUserId}`);

      expect(response.body._id).to.be.a('string');
      expect(response.body._id).to.not.be.empty;
      cy.log('✓ ID do usuário é válido');
    });
  });

  it('📋 Deve listar todos os usuários', () => {
    // ARRANGE & ACT
    cy.request({
      method: 'GET',
      url: `${API_BASE}/usuarios`,
      failOnStatusCode: false,
    }).then((response) => {
      // ASSERT
      expect(response.status).to.equal(200);
      cy.log('✓ Status 200 retornado');

      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('usuarios');
      cy.log('✓ Resposta tem estrutura correta');

      expect(response.body.usuarios).to.be.an('array');
      expect(response.body.usuarios.length).to.be.greaterThan(0);
      cy.log(`✓ ${response.body.quantidade} usuários listados`);

      // Verificar estrutura de cada usuário
      response.body.usuarios.forEach((user) => {
        expect(user).to.have.property('_id');
        expect(user).to.have.property('nome');
        expect(user).to.have.property('email');
      });
      cy.log('✓ Todos os usuários possuem estrutura válida');
    });
  });

  it('🔍 Deve buscar usuário por ID', () => {
    // ARRANGE
    const targetEmail = 'fulano@qa.com'; // Usuário padrão da API

    // Primeiro, listar usuários para encontrar o ID de um usuário existente
    cy.request({
      method: 'GET',
      url: `${API_BASE}/usuarios`,
    }).then((listResponse) => {
      const user = listResponse.body.usuarios.find((u) => u.email === targetEmail);
      
      if (user) {
        const userId = user._id;

        // ACT
        cy.request({
          method: 'GET',
          url: `${API_BASE}/usuarios/${userId}`,
          failOnStatusCode: false,
        }).then((response) => {
          // ASSERT
          expect(response.status).to.equal(200);
          cy.log('✓ Status 200 retornado');

          expect(response.body).to.have.property('_id', userId);
          expect(response.body).to.have.property('email', targetEmail);
          cy.log(`✓ Usuário encontrado: ${response.body.nome}`);

          expect(response.body).to.have.property('administrador');
          cy.log('✓ Usuário possui dados completos');
        });
      } else {
        cy.log('⚠️ Usuário padrão não encontrado, pulando cenário');
      }
    });
  });

  it('✏️ Deve editar usuário com sucesso', () => {
    // ARRANGE - Criar um usuário para editar
    const originalData = {
      nome: `Usuário Original ${Date.now()}`,
      email: `original_${Date.now()}@test.com`,
      password: 'senha123',
      administrador: 'false',
    };

    cy.request({
      method: 'POST',
      url: `${API_BASE}/usuarios`,
      body: originalData,
    }).then((createResponse) => {
      const userId = createResponse.body._id;
      cy.log(`✓ Usuário criado com ID: ${userId}`);

      // ACT
      const updatedData = {
        nome: 'Usuário Atualizado',
        email: originalData.email, // Manter mesmo email
        password: originalData.password,
        administrador: 'false',
      };

      cy.request({
        method: 'PUT',
        url: `${API_BASE}/usuarios/${userId}`,
        body: updatedData,
        failOnStatusCode: false,
      }).then((updateResponse) => {
        // ASSERT
        expect(updateResponse.status).to.equal(200);
        cy.log('✓ Status 200 retornado');

        expect(updateResponse.body).to.have.property('message', 'Registro alterado com sucesso');
        cy.log('✓ Mensagem de sucesso recebida');

        // Verificar atualizaçao fazendo GET
        cy.request({
          method: 'GET',
          url: `${API_BASE}/usuarios/${userId}`,
        }).then((getResponse) => {
          expect(getResponse.body.nome).to.equal('Usuário Atualizado');
          cy.log('✓ Dados do usuário atualizados corretamente');
        });
      });
    });
  });

  it('🗑️ Deve deletar usuário com sucesso', () => {
    // ARRANGE - Criar um usuário para deletar
    const deleteTestData = {
      nome: `Usuário Para Deletar ${Date.now()}`,
      email: `delete_${Date.now()}@test.com`,
      password: 'senha123',
      administrador: 'false',
    };

    cy.request({
      method: 'POST',
      url: `${API_BASE}/usuarios`,
      body: deleteTestData,
    }).then((createResponse) => {
      const userId = createResponse.body._id;
      cy.log(`✓ Usuário criado com ID: ${userId}`);

      // ACT
      cy.request({
        method: 'DELETE',
        url: `${API_BASE}/usuarios/${userId}`,
        failOnStatusCode: false,
      }).then((deleteResponse) => {
        // ASSERT
        expect(deleteResponse.status).to.equal(200);
        cy.log('✓ Status 200 retornado');

        expect(deleteResponse.body).to.have.property('message', 'Registro excluído com sucesso');
        cy.log('✓ Usuário deletado com sucesso');

        // Verificar que foi realmente deletado
        cy.request({
          method: 'GET',
          url: `${API_BASE}/usuarios/${userId}`,
          failOnStatusCode: false,
        }).then((getResponse) => {
          expect(getResponse.status).to.equal(400);
          cy.log('✓ Usuário não pode mais ser encontrado');
        });
      });
    });
  });
});
