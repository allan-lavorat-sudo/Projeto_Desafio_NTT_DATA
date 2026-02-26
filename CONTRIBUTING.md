# 🤝 Contribuindo para o Projeto

Obrigado por querer contribuir! Este documento fornece diretrizes para garantir qualidade e consistência.

## 📋 Processo de Contribuição

### 1. Faça um Fork
```bash
git clone https://github.com/seu-usuario/cypress-serverest-automation.git
cd cypress-serverest-automation
```

### 2. Crie uma Branch
```bash
git checkout -b feature/minha-feature
```

### 3. Faça suas alterações

### 4. Commit com mensagem descritiva
```bash
git commit -m "feat: descrição clara da mudança"
```

### 5. Push para sua branch
```bash
git push origin feature/minha-feature
```

### 6. Abra um Pull Request

---

## 📝 Convenção de Commits

Use o padrão Conventional Commits:

- `feat:` Nova feature
- `fix:` Correção de bug
- `docs:` Mudanças em documentação
- `test:` Adição ou alteração de testes
- `refactor:` Refatoração sem mudança funcional
- `perf:` Melhorias de performance
- `chore:` Tarefas não relacionadas ao código

**Exemplos:**
```
feat: ✅ Novo teste de validação de cadastro
fix: 🐛 Corrigir timeout em testes de API
docs: 📚 Atualizar README com novo endpoint
```

---

## 🧪 Padrão de Testes

### Estrutura AAA
```javascript
describe('Descrição do teste', () => {
  it('Deve fazer algo específico', () => {
    // ARRANGE - Preparar dados
    const dados = { /* ... */ };
    
    // ACT - Executar ação
    cy.visit('/');
    cy.click('button');
    
    // ASSERT - Validar resultado
    cy.should('contain', 'sucesso');
  });
});
```

### Logs Descritivos
```javascript
cy.log('🔍 Iniciando busca');
cy.log('📝 Dados preenchidos');
cy.log('✓ Validação passou');
```

---

## 🏗️ Estrutura de Pastas

- `cypress/e2e/` - Testes E2E
- `cypress/support/` - Helpers e configurações
- `cypress/fixtures/` - Dados de teste
- Novo teste? Coloque em `cypress/e2e/{tipo}/{numero}-{descricao}.cy.js`

---

## ✅ Checklist Antes de Submeter

- [ ] Código segue as convenções do projeto
- [ ] Todos os testes passam: `npm run cypress:run`
- [ ] Sem console errors ou warnings
- [ ] README atualizado se necessário
- [ ] Commits com mensagens descritivas
- [ ] Sem credenciais hardcoded

---

## 💡 Dicas

- Use `cy.log()` para melhor legibilidade
- Adicione comentários em lógica complexa
- Mantenha testes independentes
- Use fixtures para dados reutilizáveis
- Verifique a existência de elementos antes de interagir

---

## 🐛 Encontrou um Bug?

1. Verifique se já não foi reportado em Issues
2. Descreva o comportamento esperado vs atual
3. Inclua passos para reproduzir
4. Adicione screenshots se possível

---

## ❓ Dúvidas?

Abra uma discussão em Issues ou entre em contato.

**Obrigado por contribuir!** ❤️
