/**
 * Utilitários para testes de API
 */

export const API_BASE_URL = 'https://api.serverest.dev';

/**
 * Faz uma requisição autenticada
 * @param {string} method - HTTP method
 * @param {string} endpoint - Endpoint da API
 * @param {string} token - Token de autenticação
 * @param {object} body - Body da requisição (opcional)
 * @returns {object} Response
 */
export const makeAuthenticatedRequest = (method, endpoint, token, body = null) => {
  const requestConfig = {
    method,
    url: `${API_BASE_URL}${endpoint}`,
    headers: {
      Authorization: token,
    },
    failOnStatusCode: false,
  };

  if (body) {
    requestConfig.body = body;
  }

  return cy.request(requestConfig);
};

/**
 * Cria um usuário admin para testes
 * @returns {object} userData com email, senha e adminToken
 */
export const createTestAdmin = () => {
  const adminData = {
    nome: 'Admin Teste',
    email: `admin_${Date.now()}@test.com`,
    password: 'senha123',
    administrador: 'true',
  };

  return cy.request({
    method: 'POST',
    url: `${API_BASE_URL}/usuarios`,
    body: adminData,
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 201) {
      // Fazer login para obter token
      return cy.request({
        method: 'POST',
        url: `${API_BASE_URL}/login`,
        body: {
          email: adminData.email,
          password: adminData.password,
        },
      }).then((loginResponse) => {
        return {
          ...adminData,
          id: response.body._id,
          token: loginResponse.body.authorization,
        };
      });
    }
    return null;
  });
};

/**
 * Cria um usuário regular para testes
 * @returns {object} userData com email, senha e token
 */
export const createTestUser = () => {
  const userData = {
    nome: 'Usuário Teste',
    email: `user_${Date.now()}@test.com`,
    password: 'senha123',
    administrador: 'false',
  };

  return cy.request({
    method: 'POST',
    url: `${API_BASE_URL}/usuarios`,
    body: userData,
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 201) {
      return cy.request({
        method: 'POST',
        url: `${API_BASE_URL}/login`,
        body: {
          email: userData.email,
          password: userData.password,
        },
      }).then((loginResponse) => {
        return {
          ...userData,
          id: response.body._id,
          token: loginResponse.body.authorization,
        };
      });
    }
    return null;
  });
};
