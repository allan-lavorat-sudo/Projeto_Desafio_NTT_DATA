# 🚀 Upload para GitHub

## Como Enviar seu Repositório para GitHub

### Passo 1: Criar Repositório no GitHub
1. Acesse https://github.com/new
2. Projeto: `cypress-serverest-automation`
3. Descrição: `Testes E2E e de API para ServeRest com Cypress e JavaScript`
4. Deixe **Público** (para portfólio)
5. Clique **"Create repository"**

---

### Passo 2: Configurar Remote

**Copie e execute no terminal:**

```bash
cd c:\Users\allan\Downloads\Desafio-Tecnico-QA-NTT-DATA

# Substituir SEU_USUARIO pelo seu username do GitHub
git remote add origin https://github.com/SEU_USUARIO/cypress-serverest-automation.git

# Verificar se foi adicionado corretamente
git remote -v
```

---

### Passo 3: Fazer Push

```bash
# Enviar commits para GitHub (main ou master)
git branch -M main
git push -u origin main
```

**Ou se preferir manter master:**
```bash
git push -u origin master
```

---

### Passo 4: Verificar no GitHub

1. Abra https://github.com/SEU_USUARIO/cypress-serverest-automation
2. Verifique se todos os arquivos aparecem
3. Veja o histórico de commits clicando em "Commits"

---

## Estrutura que Será Enviada

```
✅ 13 commits bem estruturados
✅ 6 testes (3 Frontend + 3 API)
✅ Todas as boas práticas implementadas
✅ Documentação completa
✅ Fixtures e helpers reutilizáveis
```

---

## Adicionar ao seu Portfólio

### GitHub README Badge
```markdown
[![Cypress E2E Tests](https://img.shields.io/badge/Cypress-E2E%20Automation-green.svg)](https://github.com/SEU_USUARIO/cypress-serverest-automation)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)](https://github.com/SEU_USUARIO/cypress-serverest-automation)
```

### LinkedIN Description
```
🧪 Desenvolvido projeto de automação de testes E2E e API com Cypress:
- 3 cenários de testes do Frontend (Login, Produtos, Carrinho)
- 3 cenários de testes da API (Usuários, Produtos, Carrinhos)
- 13 commits bem estruturados
- Boas práticas e padrões de projeto
- Testes para https://serverest.dev
```

---

## ⚠️ Problemas Comuns

### Erro: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/cypress-serverest-automation.git
```

### Erro: "Permission denied" ou "Authentication failed"
- Gerar SSH Key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- Ou usar Personal Access Token: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

### Erro: "Rejected (non-fast-forward)"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 📊 Estatísticas do Projeto

| Métrica | Quantidade |
|---------|-----------|
| Commits | 13 |
| Testes Frontend | 3 |
| Testes API | 3 |
| Linhas de Código | 1500+ |
| Fixtures | 3 |
| Helpers | 2 |
| Comandos Customizados | 6+ |
| Documentação | 5 arquivos |

---

## 🎯 Próximos Passos Sugeridos

- [ ] Fazer upload para GitHub
- [ ] Compartilhar link no LinkedIn
- [ ] Adicionar badges ao perfil
- [ ] Experimentar com CI/CD (GitHub Actions)
- [ ] Extends testes com mais cenários
- [ ] Implementar Page Object Model se necessário

---

**Status:** ✅ Pronto para publicação

Desenvolvido com ❤️ por QA Automation
