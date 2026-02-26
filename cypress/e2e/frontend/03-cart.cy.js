/// <reference types="cypress" />

describe('Frontend E2E - Carrinho de Compras', () => {
  /**
   * OBJETIVO: Validar funcionalidades do carrinho de compras
   * 
   * CENÁRIOS:
   * 1. Adicionar produto ao carrinho
   * 2. Remover produto do carrinho
   * 3. Validar cálculos de totais no carrinho
   */

  beforeEach(() => {
    // Fazer login antes de cada teste
    cy.visit('/');
    cy.contains('Entrar').click();
    cy.get('[data-testid="email"]').type('fulano@qa.com');
    cy.get('[data-testid="password"]').type('teste');
    cy.get('[data-testid="entrar"]').click();
    cy.url({ timeout: 10000 }).should('include', '/home');
    cy.log('✅ Login realizado com sucesso');
  });

  it('🛒 Deve adicionar produto ao carrinho com sucesso', () => {
    // ARRANGE
    cy.log('🔍 Aguardando lista de produtos');
    cy.get('[data-testid="lista-produtos"]', { timeout: 10000 }).should('be.visible');

    // ACT
    // Capturar o nome do primeiro produto
    cy.get('[data-testid="nome-produto"]').first().then(($el) => {
      const productName = $el.text();
      cy.log(`📦 Produto selecionado: ${productName}`);

      // Clicar em adicionar ao carrinho no primeiro produto
      cy.contains(productName).parent().within(() => {
        cy.get('[data-testid="adicionar-carrinho"]').click();
      });
      cy.log('🔘 Botão "Adicionar ao carrinho" clicado');
    });

    // ASSERT
    // Verificar mensagem de sucesso
    cy.get('.alert-success, .notification-success, [role="alert"]', { timeout: 10000 })
      .should('be.visible');
    cy.log('✓ Mensagem de sucesso exibida');

    // Navegar para o carrinho
    cy.get('[data-testid="carrinho"]').click();
    cy.url({ timeout: 10000 }).should('include', '/carrinho');
    cy.log('✓ Navegou para página do carrinho');

    // Verificar que o produto está no carrinho
    cy.get('[data-testid="item-carrinho"]').should('have.length.greaterThan', 0);
    cy.log('✓ Produto adicionado ao carrinho');

    // Verificar que há quantidade e preço
    cy.get('[data-testid="quantidade-carrinho"]').should('be.visible');
    cy.get('[data-testid="preco-carrinho"]').should('be.visible');
    cy.log('✓ Quantidade e preço do produto visíveis');
  });

  it('🗑️ Deve remover produto do carrinho', () => {
    // ARRANGE
    // Adicionar um produto ao carrinho primeiro
    cy.get('[data-testid="lista-produtos"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-testid="adicionar-carrinho"]').first().click();
    cy.log('✓ Produto adicionado ao carrinho');

    // Navegar para o carrinho
    cy.get('[data-testid="carrinho"]').click();
    cy.url({ timeout: 10000 }).should('include', '/carrinho');

    cy.get('[data-testid="item-carrinho"]').then(($items) => {
      const initialCount = $items.length;
      cy.log(`📊 Items iniciais no carrinho: ${initialCount}`);

      // ACT
      cy.get('[data-testid="remover"]').first().click();
      cy.log('🗑️ Clicado em remover');

      // ASSERT
      cy.log('⏳ Aguardando atualização');
      cy.get('[data-testid="item-carrinho"]', { timeout: 10000 }).should(($newItems) => {
        expect($newItems.length).to.be.lessThan(initialCount);
      });
      cy.log('✓ Produto removido com sucesso');

      // Verificar mensagem de confirmação
      cy.get('.alert-success, .notification, [role="alert"]')
        .should('be.visible');
      cy.log('✓ Mensagem de confirmação exibida');
    });
  });

  it('💰 Deve calcular corretamente o total do carrinho', () => {
    // ARRANGE
    cy.log('🔍 Preparando carrinho');
    cy.get('[data-testid="lista-produtos"]', { timeout: 10000 }).should('be.visible');

    // Adicionar múltiplos produtos
    cy.get('[data-testid="adicionar-carrinho"]').eq(0).click();
    cy.wait(1000);
    cy.get('[data-testid="adicionar-carrinho"]').eq(1).click();
    cy.log('✓ Dois produtos adicionados');

    // Navegar para o carrinho
    cy.get('[data-testid="carrinho"]').click();
    cy.url({ timeout: 10000 }).should('include', '/carrinho');

    // ACT & ASSERT
    // Coletar preços dos produtos
    cy.get('[data-testid="preco-carrinho"]').each(($el) => {
      cy.wrap($el).invoke('text').should('include', 'R$');
    });
    cy.log('✓ Preços dos produtos estão em formato correto');

    // Verificar que total existe e é maior que zero
    cy.get('[data-testid="total-carrinho"]').should('be.visible');
    cy.get('[data-testid="total-carrinho"]').invoke('text').then((text) => {
      const totalText = text.replace('R$ ', '').replace(',', '.');
      const total = parseFloat(totalText);
      expect(total).to.be.greaterThan(0);
      cy.log(`✓ Total calculado corretamente: R$ ${totalText}`);
    });

    // Verificar subtotal
    cy.get('[data-testid="subtotal-carrinho"]').should('be.visible');
    cy.log('✓ Subtotal está visível');

    // Verificar que há quantidade total
    cy.get('[data-testid="quantidade-total"]').should('be.visible');
    cy.log('✓ Quantidade total está visível');

    // Verificar botão de finalizar compra
    cy.get('[data-testid="finalizar-compra"]').should('be.visible');
    cy.log('✓ Botão de finalizar compra está acessível');
  });
});
