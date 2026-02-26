/// <reference types="cypress" />

describe('Frontend E2E - Autenticação (Login)', () => {
  /**
   * OBJETIVO: Validar o fluxo de autenticação do usuário
   * 
   * CENÁRIOS:
   * 1. Login com credenciais válidas
   * 2. Login com credenciais inválidas
   * 3. Logout do usuário
   */

  beforeEach(() => {
    cy.visit('/');
    cy.log('✅ Página de login carregada');
  });

  it('✅ Deve fazer login com credenciais válidas', () => {
    // ARRANGE
    const email = 'fulano@qa.com';
    const password = 'teste';

    // ACT
    cy.contains('Entrar').should('be.visible').click();
    cy.log('🔍 Cliar no botão Entrar');

    cy.get('[data-testid="email"]').should('be.visible').type(email);
    cy.log(`📝 Email preenchido: ${email}`);

    cy.get('[data-testid="password"]').should('be.visible').type(password);
    cy.log('📝 Senha preenchida');

    cy.get('[data-testid="entrar"]').should('be.visible').click();
    cy.log('🔘 Botão enviar clicado');

    // ASSERT
    cy.url({ timeout: 10000 }).should('include', '/home');
    cy.log('✓ URL alterada para /home');

    cy.get('[data-testid="carrinho"]').should('be.visible');
    cy.log('✓ Elemento do carrinho está visível - login bem-sucedido');

    // Assertiva adicional: verificar se nome do usuário está visível
    cy.contains('fulano').should('be.visible');
    cy.log('✓ Nome do usuário exibido na página');
  });

  it('❌ Deve exibir erro ao fazer login com credenciais inválidas', () => {
    // ARRANGE
    const email = 'usuario_inexistente@test.com';
    const password = 'senhaincorreta123';

    // ACT
    cy.contains('Entrar').should('be.visible').click();
    cy.log('🔍 Clicado no botão Entrar');

    cy.get('[data-testid="email"]').should('be.visible').type(email);
    cy.get('[data-testid="password"]').should('be.visible').type(password);
    cy.get('[data-testid="entrar"]').should('be.visible').click();
    cy.log('📝 Tentativa de login com credenciais inválidas');

    // ASSERT
    // Esperar pela mensagem de erro
    cy.get('.alert, .notification, [role="alert"]', { timeout: 10000 })
      .should('be.visible')
      .should('contain.text', ['email', 'senha', 'inválid', 'erro', 'falh'].join('|'));
    
    cy.log('✓ Mensagem de erro exibida para credenciais inválidas');

    // Garantir que não foi redirecionado para home
    cy.url().should('not.include', '/home');
    cy.log('✓ Usuário não foi redirecionado para /home');
  });

  it('🚪 Deve fazer logout com sucesso', () => {
    // ARRANGE - Fazer login primeiro
    const email = 'fulano@qa.com';
    const password = 'teste';

    cy.contains('Entrar').click();
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="entrar"]').click();
    cy.log('✓ Login realizado');

    // Aguardar carregamento da página home
    cy.url({ timeout: 10000 }).should('include', '/home');

    // ACT
    cy.get('[data-testid="logout"]').should('be.visible').click();
    cy.log('🔘 Botão logout clicado');

    // ASSERT
    cy.url({ timeout: 10000 }).should('not.include', '/home');
    cy.log('✓ Redirecionado para fora da área autenticada');

    cy.contains('Entrar').should('be.visible');
    cy.log('✓ Botão "Entrar" está visível novamente - logout bem-sucedido');

    // Verificar que o carrinho não está mais visível
    cy.get('[data-testid="carrinho"]').should('not.exist');
    cy.log('✓ Elementos protegidos não estão mais visíveis');
  });
});
