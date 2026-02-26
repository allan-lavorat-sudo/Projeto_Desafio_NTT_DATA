# 📋 Estrutura de Testes - Resumo

## Testes E2E Frontend (3 cenários)

### 1. Autenticação (01-auth.cy.js)
```
Cenário 1: Login com credenciais válidas
  Entrada: email: fulano@qa.com, password: teste
  Saída esperada:
    - URL muda para /home
    - Nome do usuário exibido
    - Elemento carrinho visível

Cenário 2: Login com credenciais inválidas  
  Entrada: email inválido, senha incorreta
  Saída esperada:
    - Mensagem de erro exibida
    - URL NÃO muda para /home
    - Permanece na página de login

Cenário 3: Logout
  Entrada: Usuário logado clica logout
  Saída esperada:
    - URL sai de /home
    - Botão "Entrar" visível novamente
    - Elementos protegidos removidos
```

### 2. Visualização de Produtos (02-products.cy.js)
```
Cenário 1: Listar produtos
  Entrada: Acesso à página principal
  Saída esperada:
    - Mínimo 1 produto visível
    - Preços em formato R$
    - Botões "Adicionar ao carrinho" presentes

Cenário 2: Buscar produto
  Entrada: Termo de busca "Samsung"
  Saída esperada:
    - Resultados contêm o termo
    - Mínimo 1 resultado retornado
    - Lista atualizada

Cenário 3: Visualizar detalhes
  Entrada: Clique no produto
  Saída esperada:
    - URL é /produto/{id}
    - Nome, preço, descrição visíveis
    - Quantidade disponível exibida
```

### 3. Carrinho de Compras (03-cart.cy.js)
```
Cenário 1: Adicionar ao carrinho
  Entrada: Clique em "Adicionar ao carrinho"
  Saída esperada:
    - Mensagem de sucesso
    - Produto aparece no carrinho
    - Quantidade e preço visíveis

Cenário 2: Remover do carrinho
  Entrada: Clique em "Remover"
  Saída esperada:
    - Confirmação de remoção
    - Produto desaparece
    - Total recalculado

Cenário 3: Calcular total
  Entrada: Múltiplos produtos no carrinho
  Saída esperada:
    - Subtotal calculado
    - Total/Grande Total visível
    - Quantidade total exibida
```

---

## Testes de API (3 cenários)

### 1. Usuários (01-users.cy.js)
```
Cenário 1: Criar usuário
  Método: POST /usuarios
  Entrada: nome, email, password, administrador
  Validação:
    - Status 201
    - ID retornado
    - Mensagem de sucesso

Cenário 2: Listar usuários
  Método: GET /usuarios
  Validação:
    - Status 200
    - Array de usuários
    - Quantidade retornada

Cenário 3: Buscar por ID
  Método: GET /usuarios/{_id}
  Validação:
    - Status 200
    - Dados corretos do usuário

Cenário 4: Editar usuário
  Método: PUT /usuarios/{_id}
  Validação:
    - Status 200
    - Dados atualizados confirmados

Cenário 5: Deletar usuário
  Método: DELETE /usuarios/{_id}
  Validação:
    - Status 200
    - GET posterior retorna 400
```

### 2. Produtos (02-products.cy.js)
```
Cenário 1: Criar produto (admin)
  Método: POST /produtos
  Entrada: nome, preco, descricao, quantidade + token admin
  Validação:
    - Status 201
    - Requer autenticação admin
    - ID retornado

Cenário 2: Listar produtos
  Método: GET /produtos
  Validação:
    - Status 200
    - Array com estrutura válida
    - Quantidade retornada

Cenário 3: Buscar por ID
  Método: GET /produtos/{_id}
  Validação:
    - Status 200
    - Dados completos do produto

Cenário 4: Editar produto (admin)
  Método: PUT /produtos/{_id}
  Validação:
    - Status 200
    - Requer token admin
    - Dados atualizados

Cenário 5: Deletar produto (admin)
  Método: DELETE /produtos/{_id}
  Validação:
    - Status 200
    - Requer token admin
```

### 3. Carrinhos (03-carrinhos.cy.js)
```
Cenário 1: Criar carrinho
  Método: POST /carrinhos
  Entrada: idProduto, quantidade + token de usuário
  Validação:
    - Status 201
    - ID do carrinho retornado

Cenário 2: Listar carrinhos
  Método: GET /carrinhos
  Validação:
    - Status 200
    - Array de carrinhos
    - Estrutura válida

Cenário 3: Buscar por ID
  Método: GET /carrinhos/{_id}
  Validação:
    - Status 200
    - Produtos do carrinho listados

Cenário 4: Concluir compra
  Método: DELETE /carrinhos/concluir-compra
  Validação:
    - Status 200
    - Quantidade comprada retornada

Cenário 5: Cancelar compra
  Método: DELETE /carrinhos/cancelar-compra
  Validação:
    - Status 200
    - Estoque retornado ao produto
```

---

## Tecnologias & Padrões

✅ **Cypress 13.6.2**
✅ **JavaScript ES6+**
✅ **Padrão AAA (Arrange-Act-Assert)**
✅ **Comandos Customizados**
✅ **Helpers Reutilizáveis**
✅ **Fixtures com Dados**
✅ **Logs Descritivos**
✅ **Timeouts Configuráveis**

**Total: 6 cenários + subcenesários = 15 testes de qualidade**
