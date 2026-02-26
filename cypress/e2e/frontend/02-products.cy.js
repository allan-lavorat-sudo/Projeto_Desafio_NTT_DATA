/// <reference types="cypress" />

describe('Frontend E2E - Visualização de Produtos', () => {
  /**
   * OBJETIVO: Validar listagem e visualização de produtos
   * 
   * CENÁRIOS:
   * 1. Visualizar lista de produtos na página inicial
   * 2. Buscar um produto específico
   * 3. Verificar detalhes do produto
   */

  beforeEach(() => {
    cy.visit('/');
    cy.log('✅ Página inicial carregada');
  });

  it('📦 Deve exibir lista de produtos na página inicial', () => {
    // ARRANGE
    const expectedProducts = ['Logitech USB Headseta', 'Samsung Anime', 'XBOX - Gears of War'];

    // ACT
    cy.log('🔍 Aguardando carregamento dos produtos');
    cy.get('[data-testid="lista-produtos"]', { timeout: 10000 })
      .should('be.visible');

    // ASSERT
    // Verificar que há pelo menos um produto visível
    cy.get('[data-testid="nome-produto"]').should('have.length.greaterThan', 0);
    cy.log('✓ Produtos carregados na página');

    // Verificar que cada produto tem preço visível
    cy.get('[data-testid="preco-produto"]').each(($el) => {
      cy.wrap($el).should('be.visible');
      cy.wrap($el).invoke('text').should('include', 'R$');
    });
    cy.log('✓ Todos os produtos exibem preço em formato correto');

    // Verificar que há botão "Adicionar ao carrinho"
    cy.get('[data-testid="adicionar-carrinho"]').should('have.length.greaterThan', 0);
    cy.log('✓ Botões "Adicionar ao carrinho" são exibidos');
  });

  it('🔎 Deve buscar um produto específico com sucesso', () => {
    // ARRANGE
    const searchTerm = 'Samsung';

    // ACT
    cy.log('🔍 Procurando campo de busca');
    cy.get('[data-testid="pesquisa"]')
      .should('be.visible')
      .clear()
      .type(searchTerm);
    cy.log(`📝 Termo buscado: ${searchTerm}`);

    cy.get('[data-testid="botao-pesquisa"], button:contains("Pesquisar")').click();
    cy.log('🔘 Búsca executada');

    // ASSERT
    cy.log('⏳ Aguardando resultados da busca');
    cy.get('[data-testid="nome-produto"]', { timeout: 10000 }).each(($el) => {
      cy.wrap($el).invoke('text').should('include', searchTerm);
    });
    cy.log(`✓ Todos os produtos contêm o termo "${searchTerm}"`);

    // Verificar que há resultados
    cy.get('[data-testid="nome-produto"]').should('have.length.greaterThan', 0);
    cy.log('✓ Resultados encontrados para a búsca');
  });

  it('ℹ️ Deve exibir detalhes do produto ao clicar', () => {
    // ARRANGE
    cy.log('🔍 Aguardando carregamento dos produtos');
    cy.get('[data-testid="lista-produtos"]', { timeout: 10000 }).should('be.visible');

    // ACT
    // Clicar no primeiro produto
    cy.get('[data-testid="nome-produto"]').first().click();
    cy.log('🔘 Clicado no primeiro produto');

    // ASSERT
    cy.log('⏳ Aguardando página de detalhes');
    cy.url({ timeout: 10000 }).should('include', '/produto');
    cy.log('✓ URL alterada para página de detalhes do produto');

    // Verificar que informações detalhadas estão visíveis
    cy.get('[data-testid="nome-detalhado"]').should('be.visible');
    cy.log('✓ Nome do produto está visível');

    cy.get('[data-testid="preco-detalhado"]').should('be.visible');
    cy.log('✓ Preço está visível');

    cy.get('[data-testid="descricao"]').should('be.visible');
    cy.log('✓ Descrição está visível');

    // Verificar que o botão adicionar ao carrinho está presente
    cy.get('[data-testid="adicionar-carrinho"]').should('be.visible');
    cy.log('✓ Botão "Adicionar ao carrinho" está acessível');

    // Verificar que há quantidades disponíveis
    cy.get('[data-testid="quantidade"]').should('be.visible');
    cy.log('✓ Informação de quantidade está visível');
  });
});
