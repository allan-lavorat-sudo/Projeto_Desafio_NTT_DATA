/**
 * Utilitarios para testes de API
 */

export const API_BASE_URL = 'https://serverest.dev';

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
    if (response.status !== 201) {
      throw new Error(`Falha ao criar admin de teste: ${response.status}`);
    }

    return cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/login`,
      body: {
        email: adminData.email,
        password: adminData.password,
      },
    }).then((loginResponse) => ({
      ...adminData,
      id: response.body._id,
      token: loginResponse.body.authorization,
    }));
  });
};

export const createTestUser = () => {
  const userData = {
    nome: 'Usuario Teste',
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
    if (response.status !== 201) {
      throw new Error(`Falha ao criar usuario de teste: ${response.status}`);
    }

    return cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/login`,
      body: {
        email: userData.email,
        password: userData.password,
      },
    }).then((loginResponse) => ({
      ...userData,
      id: response.body._id,
      token: loginResponse.body.authorization,
    }));
  });
};
