# 🚀 Cypress ServeRest - Automação de Testes E2E e API

Projeto de automação de testes E2E e API desenvolvido com **Cypress + JavaScript**, seguindo boas práticas de desenvolvimento e padrões de projeto.

---

## 📋 Sumário de Cenários

### Testes Frontend (E2E) - 3 Cenários

#### 1️⃣ **Autenticação (Login)** - `01-auth.cy.js`
**Objetivo:** Validar funcionalidades de autenticação do usuário

| Cenário | Objetivo | Passos | Assertivas |
|---------|----------|--------|-----------|
| Login Válido | Autenticar usuário com credenciais corretas | 1. Acessar página de login<br>2. Preencher email e senha<br>3. Clicar em "Entrar" | ✓ Redirecionado para /home<br>✓ Nome do usuário exibido<br>✓ Carrinho disponível |
| Login Inválido | Exibir erro com credenciais inválidas | 1. Tentar login com email inexistente<br>2. Preencher senha incorreta<br>3. Submitir formulário | ✓ Mensagem de erro exibida<br>✓ URL não alterada<br>✓ Não redirecionado para /home |
| Logout | Fazer logout com sucesso | 1. Estar logado<br>2. Clicar botão logout<br>3. Validar redirecionamento | ✓ Redirecionado para /home (não autenticado)<br>✓ Botão "Entrar" visível<br>✓ Elementos protegidos removidos |

#### 2️⃣ **Visualização de Produtos** - `02-products.cy.js`
**Objetivo:** Validar listagem e visualização de produtos

| Cenário | Objetivo | Passos | Assertivas |
|---------|----------|--------|-----------|
| Listar Produtos | Exibir lista de produtos na página inicial | 1. Acessar home<br>2. Aguardar carregamento<br>3. Visualizar produtos | ✓ Mínimo 1 produto visível<br>✓ Preço em formato correto (R$)<br>✓ Botoes "Adicionar ao carrinho" disponíveis |
| Buscar Produto | Buscar produto específico | 1. Preencher campo de busca<br>2. Executar busca<br>3. Verificar resultados | ✓ Resultados contêm termo buscado<br>✓ Mínimo 1 resultado retornado<br>✓ Lista atualizada |
| Detalhes do Produto | Visualizar informações completas | 1. Clicar em produto<br>2. Aguardar página de detalhes<br>3. Validar dados | ✓ URL alterada para /produto/{id}<br>✓ Nome, preço, descrição visíveis<br>✓ Quantidade disponível exibida<br>✓ Botão "Adicionar ao carrinho" presente |

#### 3️⃣ **Carrinho de Compras** - `03-cart.cy.js`
**Objetivo:** Validar funcionalidades do carrinho

| Cenário | Objetivo | Passos | Assertivas |
|---------|----------|--------|-----------|
| Adicionar ao Carrinho | Adicionar produto ao carrinho | 1. Estar logado<br>2. Clicar "Adicionar ao carrinho"<br>3. Navegar para carrinho | ✓ Mensagem de sucesso exibida<br>✓ Produto aparece no carrinho<br>✓ Quantidade e preço visíveis |
| Remover do Carrinho | Remover produto do carrinho | 1. Ter produtos no carrinho<br>2. Clicar "Remover"<br>3. Validar remoção | ✓ Confirmação de remoção<br>✓ Produto desaparece da lista<br>✓ Total recalculado |
| Calcular Total | Validar cálculo do total | 1. Adicionar múltiplos produtos<br>2. Ir para carrinho<br>3. Verificar totalizações | ✓ Subtotal calculado corretamente<br>✓ Total/Grande Total visível<br>✓ Quantidade total exibida<br>✓ Botão "Finalizar compra" disponível |

---

### Testes API - 3 Cenários

#### 1️⃣ **Gerenciamento de Usuários** - `01-users.cy.js`
**Objetivo:** Validar operações CRUD de usuários

| Operação | Objetivo | Método | Endpoint | Assertivas |
|----------|----------|--------|----------|-----------|
| Criar Usuário | Criar novo usuário | POST | `/usuarios` | ✓ Status 201<br>✓ ID retornado<br>✓ Mensagem de sucesso<br>✓ Email guardado |
| Listar Usuários | Listar todos os usuários | GET | `/usuarios` | ✓ Status 200<br>✓ Array de usuários<br>✓ Cada usuário tem _id, nome, email<br>✓ Quantidade retornada |
| Buscar por ID | Buscar usuário específico | GET | `/usuarios/{_id}` | ✓ Status 200<br>✓ Dados corretos do usuário<br>✓ Todas as propriedades presentes |
| Editar Usuário | Atualizar dados do usuário | PUT | `/usuarios/{_id}` | ✓ Status 200<br>✓ Mensagem "Registro alterado"<br>✓ Dados atualizados confirmados com GET |
| Deletar Usuário | Remover usuário | DELETE | `/usuarios/{_id}` | ✓ Status 200<br>✓ Mensagem "Registro excluído"<br>✓ GET subsequente retorna 400 |

#### 2️⃣ **Gerenciamento de Produtos** - `02-products.cy.js`
**Objetivo:** Validar operações CRUD de produtos (Admin)

| Operação | Objetivo | Método | Endpoint | Assertivas |
|----------|----------|--------|----------|-----------|
| Criar Produto | Criar novo produto (admin) | POST | `/produtos` | ✓ Status 201<br>✓ Requer token de admin<br>✓ ID do produto retornado<br>✓ Nome, preço, descrição confirmados |
| Listar Produtos | Listar todos os produtos | GET | `/produtos` | ✓ Status 200<br>✓ Array de produtos<br>✓ Cada produto tem _id, nome, preco<br>✓ Quantidade retornada |
| Buscar por ID | Buscar produto específico | GET | `/produtos/{_id}` | ✓ Status 200<br>✓ Dados corretos do produto<br>✓ Nome, preço, descrição presentes |
| Editar Produto | Atualizar dados do produto (admin) | PUT | `/produtos/{_id}` | ✓ Status 200<br>✓ Requer token admin<br>✓ Dados atualizados confirmados |
| Deletar Produto | Remover produto (admin) | DELETE | `/produtos/{_id}` | ✓ Status 200<br>✓ Requer token admin<br>✓ GET subsequente retorna 400 |

#### 3️⃣ **Gerenciamento de Carrinhos** - `03-carrinhos.cy.js`
**Objetivo:** Validar operações com carrinhos

| Operação | Objetivo | Método | Endpoint | Assertivas |
|----------|----------|--------|----------|-----------|
| Criar Carrinho | Adicionar produtos ao carrinho | POST | `/carrinhos` | ✓ Status 201<br>✓ Requer token de usuário<br>✓ ID do carrinho retornado |
| Listar Carrinhos | Listar todos os carrinhos | GET | `/carrinhos` | ✓ Status 200<br>✓ Array de carrinhos<br>✓ Estrutura válida de cada carrinho |
| Buscar por ID | Buscar carrinho específico | GET | `/carrinhos/{_id}` | ✓ Status 200<br>✓ Produtos do carrinho listados<br>✓ Estrutura válida |
| Concluir Compra | Finalizar carrinho e comprar | DELETE | `/carrinhos/concluir-compra` | ✓ Status 200<br>✓ Requer token do usuário<br>✓ Quantidade comprada retornada |
| Cancelar Compra | Cancelar compra e retornar estoque | DELETE | `/carrinhos/cancelar-compra` | ✓ Status 200<br>✓ Requer token do usuário<br>✓ Estoque retornado ao produto |

---

## 🗂️ Estrutura do Projeto

```
cypress-serverest-automation/
├── cypress/
│   ├── e2e/
│   │   ├── frontend/
│   │   │   ├── 01-auth.cy.js           # Testes de autenticação
│   │   │   ├── 02-products.cy.js       # Testes de visualização de produtos
│   │   │   └── 03-cart.cy.js           # Testes de carrinho
│   │   └── api/
│   │       ├── 01-users.cy.js          # Testes CRUD de usuários
│   │       ├── 02-products.cy.js       # Testes CRUD de produtos
│   │       └── 03-carrinhos.cy.js      # Testes de carrinhos
│   ├── support/
│   │   ├── commands.js                 # Comandos customizados do Cypress
│   │   ├── e2e.js                      # Configuração global E2E
│   │   └── helpers/
│   │       ├── api-helpers.js          # Funções auxiliares para API
│   │       └── ui-helpers.js           # Funções auxiliares para UI
│   └── fixtures/
│       ├── user-data.json              # Dados de teste de usuários
│       ├── product-data.json           # Dados de teste de produtos
│       └── cart-data.json              # Dados de teste de carrinhos
├── cypress.config.js                   # Configuração do Cypress
├── package.json                        # Dependências e scripts
├── .gitignore                          # Arquivos ignorados no Git
└── README.md                           # Este arquivo
```

---

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (v14+)
- npm ou yarn

### Passos de Instalação

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/seu-usuario/cypress-serverest-automation.git
   cd cypress-serverest-automation
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Abrir Cypress UI**
   ```bash
   npm run cypress:open
   ```

---

## 🎯 Executando os Testes

### Executar todos os testes
```bash
npm run cypress:run
npm run cy:run:all
```

### Executar apenas testes Frontend
```bash
npm run cy:run:frontend
```

### Executar apenas testes de API
```bash
npm run cy:run:api
```

### Executar em modo headless (ci)
```bash
npm run cy:headless
```

### Executar teste específico
```bash
npx cypress run --spec "cypress/e2e/frontend/01-auth.cy.js"
```

---

## 🏗️ Boas Práticas Implementadas

### 1. **Estrutura de Testes AAA (Arrange-Act-Assert)**
   - **Arrange:** Preparação dos dados e estado
   - **Act:** Execução da ação
   - **Assert:** Validação dos resultados

### 2. **Comandos Customizados**
   - `cy.loginFrontend()` - Login no frontend
   - `cy.logoutFrontend()` - Logout
   - `cy.createUserAPI()` - Criar usuário via API
   - `cy.loginAPI()` - Login via API
   - `cy.getAuthToken()` - Obter token de autenticação

### 3. **Helpers e Utilitários**
   - `api-helpers.js` - Funções reutilizáveis para testes de API
   - `ui-helpers.js` - Funções reutilizáveis para testes E2E

### 4. **Fixtures**
   - Dados de teste centralizados em arquivos JSON
   - Fácil manutenção e reutilização

### 5. **Logs Descritivos**
   - Cada teste possui logs estruturados com emojis
   - Facilita visualização e debugging

### 6. **Tratamento de Erros**
   - Uso de `failOnStatusCode: false` para validar erros esperados
   - Assertions robustas para diferentes cenários

### 7. **Timeouts Configuráveis**
   - Cypress.config.js com timeouts apropriados
   - Aguardas explícitas em operações críticas

---

## 🔧 Configuração do Cypress

### Endpoints Configurados

```javascript
{
  baseUrl: 'https://front.serverest.dev',     // Frontend
  apiUrl: 'https://api.serverest.dev',        // API
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 720
}
```

---

## 📊 Recursos Cypress Utilizados

- ✅ **cy.visit()** - Navegação
- ✅ **cy.get()** - Seleção de elementos
- ✅ **cy.click()** - Interações
- ✅ **cy.type()** - Preenchimento de inputs
- ✅ **cy.request()** - Requisições HTTP
- ✅ **cy.should()** - Assertions
- ✅ **cy.then()** - Encadeamento de ações
- ✅ **cy.wrap()** - Wrapper de objetos
- ✅ **cy.url()** - Validação de URLs
- ✅ **cy.contain()** - Busca por texto
- ✅ **cy.each()** - Iteração
- ✅ **cy.wait()** - Aguardas

---

## 🔐 Segurança

- ✅ Não há credenciais hardcoded no código
- ✅ Uso de usuários de teste da plataforma
- ✅ Tokens armazenados dinamicamente durante execução
- ✅ Cleanup automático de dados de teste

---

## 🐛 Debugging

### Abrir Chrome DevTools
```bash
npm run cypress:open
# Clicar em "Inspect Elements" dentro do Cypress
```

### Ver logs no console
```javascript
cy.log('Mensagem de debug')
```

### Pausar execução
```javascript
cy.pause() // Pausar e executar manualmente
cy.debug() // Debugar objeto
```

---

## 📝 Commits

Os commits foram estruturados de forma clara e descritiva:

```
feat: 🚀 Estrutura inicial do projeto Cypress
feat: ✅ Testes de autenticação (Frontend)
feat: 📦 Testes de visualização de produtos (Frontend)
feat: 🛒 Testes de carrinho de compras (Frontend)
feat: 👤 Testes CRUD de usuários (API)
feat: 📦 Testes CRUD de produtos (API)
feat: 🛒 Testes de carrinhos (API)
docs: 📚 Documentação completa do projeto
```

---

## ✅ Checklist de Qualidade

- ✅ 3 cenários E2E do Frontend implementados
- ✅ 3 cenários de teste de API implementados
- ✅ Todos os testes com assertivas bem definidas
- ✅ Código organizado em pastas temáticas
- ✅ Helpers e utilitários reutilizáveis
- ✅ Fixtures com dados de teste
- ✅ Comandos customizados do Cypress
- ✅ Documentação completa
- ✅ Commits bem estruturados
- ✅ Boas práticas de desenvolvimento
- ✅ Padrões de projeto (AAA, Page Object)
- ✅ Logs descritivos com emojis

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se o Node.js está instalado: `node --version`
2. Reinstale dependências: `rm -rf node_modules && npm install`
3. Limpe cache do Cypress: `npx cypress cache clear`
4. Consulte a documentação oficial: https://docs.cypress.io

---

## 📄 Licença

MIT License - Sinta-se livre para usar este projeto como base para seus testes.

---

**Desenvolvido com ❤️ por QA Automation**
