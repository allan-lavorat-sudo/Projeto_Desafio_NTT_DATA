# 🚀 Quick Start - Cypress ServeRest

## ⚡ Setup Rápido (5 minutos)

### 1. Pré-requisitos
- Node.js 14+ instalado
- Git instalado
- Terminal aberto

### 2. Instalar Dependências
```bash
npm install
```

### 3. Abrir Cypress
```bash
npm run cypress:open
```

### 4. Executar um Teste
- Clique em qualquer teste `.cy.js` para executá-lo
- Ou use o terminal: `npm run cypress:run`

---

## 📊 Executar Testes por Grupo

### Todos os testes
```bash
npm run cy:run:all
```

### Apenas Frontend
```bash
npm run cy:run:frontend
```

### Apenas API
```bash
npm run cy:run:api
```

### Teste específico
```bash
npx cypress run --spec "cypress/e2e/frontend/01-auth.cy.js"
```

---

## 📁 Estrutura dos Testes

### Frontend (3 testes)
1. **Login** - `cypress/e2e/frontend/01-auth.cy.js`
2. **Produtos** - `cypress/e2e/frontend/02-products.cy.js`
3. **Carrinho** - `cypress/e2e/frontend/03-cart.cy.js`

### API (3 testes)
1. **Usuários** - `cypress/e2e/api/01-users.cy.js`
2. **Produtos** - `cypress/e2e/api/02-products.cy.js`
3. **Carrinhos** - `cypress/e2e/api/03-carrinhos.cy.js`

---

## 🐛 Troubleshooting

**Erro: "Command not found"**
- Instale Node.js de novo: https://nodejs.org

**Erro: "Port already in use"**
- Feche outras instâncias do Cypress

**Testes falhando**
- Verifique internet (testes usam https://front.serverest.dev)
- Limpe cache: `npx cypress cache clear`

---

## 📝 Para Mais Detalhes
Veja [README.md](README.md) para documentação completa

**Desenvolvido com ❤️ por QA Automation**
