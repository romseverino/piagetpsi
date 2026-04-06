o readme.md também [# 🧠 PsiCare - Sistema de Gestão para Clínicas Psicológicas

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/LGPD-Conforme-orange?style=for-the-badge" alt="LGPD">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</p>

<p align="center">
  <strong>Sistema completo de gestão clínica desenvolvido com foco em segurança, ética e eficiência para profissionais da psicologia.</strong>
</p>

<p align="center">
  <a href="https://olifrans.github.io/PsiCare" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Demo_GitHub_Pages-Clique_Aqui-2c7a7b?style=for-the-badge" alt="Demo GitHub Pages">
  </a>
  <a href="https://psi-care.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Demo_Vercel-Clique_Aqui-000000?style=for-the-badge" alt="Demo Vercel">
  </a>
</p>

---

## 📋 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🔐 Segurança e Conformidade](#-segurança-e-conformidade)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Como Usar](#-como-usar)
- [👥 Usuários de Teste](#-usuários-de-teste)
- [📚 Documentação](#-documentação)
- [🤝 Contribuindo](#-contribuindo)
- [📄 Licença](#-licença)
- [👨‍💻 Autor](#-autor)

---

## ✨ Funcionalidades

### 🧑‍⚕️ Gestão de Pacientes
- Cadastro completo com dados pessoais e anamnese
- Controle de status do tratamento (Ativo, Suspenso, Alta)
- Histórico de atendimentos integrado

### 📅 Agenda Inteligente
- Agendamento de consultas presenciais e online
- Calendário visual interativo
- Lembretes automáticos e confirmações
- Integração com links de videoconferência

### 📋 Prontuário Eletrônico (PEP)
- Registro de evoluções com editor de texto rico
- Timeline visual do histórico do paciente
- Campo para observações sigilosas (apenas profissional)
- Bloqueio de edição para integridade dos registros

### 💰 Módulo Financeiro
- Controle de recebimentos e pagamentos
- Múltiplos métodos de pagamento (PIX, Cartão, Dinheiro)
- Relatórios de faturamento em tempo real
- Emissão de recibos para convênios

### ⚙️ Configurações e Perfil
- Gestão de dados do profissional
- Personalização de valores de consulta
- Backup e restauração de dados locais

---

## 🔐 Segurança e Conformidade

Este projeto foi desenvolvido observando rigorosamente:

| Norma | Aplicação no PsiCare |
|-------|---------------------|
| **LGPD** | Criptografia de dados, consentimento digital, direitos do titular |
| **Código de Ética dos Psicólogos** | Sigilo profissional, acesso restrito, logs de auditoria |
| **Boas Práticas de Segurança** | Senhas com hash, validação de entrada, proteção XSS |

> ⚠️ **Importante**: Esta é uma versão de demonstração que utiliza `localStorage` para persistência de dados. Para uso em produção, recomenda-se implementação com backend seguro e banco de dados criptografado.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com variáveis CSS e design responsivo
- **JavaScript (ES6+)** - Lógica da aplicação sem frameworks
- **Font Awesome** - Ícones vetoriais
- **Mermaid.js** - Renderização de diagramas UML

### Arquitetura
- **Single Page Application (SPA)** - Navegação sem recarregamento
- **LocalStorage API** - Persistência de dados no navegador
- **Componentização** - Código modular e reutilizável
- **Mobile-First** - Design responsivo para todos os dispositivos

### Ferramentas de Desenvolvimento
- Git & GitHub para versionamento
- Vercel & GitHub Pages para deploy
- ESLint para qualidade de código

---

## 📁 Estrutura do Projeto

```
PsiCare/
├── index.html              # Landing page comercial
├── psicare.html            # Sistema principal (SPA)
├── documentacao_teorica.html  # Documentação técnica e teórica
├── documentacao_uml.html   # Diagramas UML com Mermaid.js
├── README.md               # Este arquivo
└── .github/
    └── workflows/
        └── deploy.yml      # Pipeline de deploy automático
```

---

## 🚀 Como Usar

### 🌐 Acessar Online (Recomendado)

Clique em um dos links abaixo para experimentar o sistema imediatamente:

| Plataforma | Link | Status |
|-----------|------|--------|
| **GitHub Pages** | [🔗 Acessar Demo](https://olifrans.github.io/PsiCare) | ✅ Ativo |
| **Vercel** | [🔗 Acessar Demo](https://psi-care.vercel.app) | ✅ Ativo |

### 💻 Executar Localmente

1. **Clone o repositório**
```bash
git clone https://github.com/olifrans/PsiCare.git
cd PsiCare
```

2. **Abra o arquivo principal**
```bash
# Basta abrir o arquivo index.html no seu navegador
# Ou use uma extensão como Live Server no VS Code
```

3. **Acesse o sistema**
- Landing page: `index.html`
- Sistema: `psicare.html`
- Documentação: `documentacao_teorica.html` ou `documentacao_uml.html`

### 👥 Usuários de Teste

Utilize estas credenciais para explorar todas as funcionalidades:

| Tipo de Usuário | E-mail | Senha | Permissões |
|----------------|--------|-------|-----------|
| **Psicólogo** | `psicologo@psicare.com` | `123456` | Acesso completo: pacientes, agenda, prontuários, financeiro |
| **Paciente** | `paciente@psicare.com` | `123456` | Acesso limitado: agenda pessoal, visualização de prontuário |
| **Administrador** | `admin@psicare.com` | `123456` | Gestão do sistema e configurações globais |

---

## 📚 Documentação

### 📖 Documentação Técnica e Teórica
[🔗 Acessar Documentação](https://olifrans.github.io/PsiCare/documentacao_teorica.html)

Contém:
- Aspectos éticos e legais (LGPD, Código de Ética)
- Fundamentos de arquitetura de software
- Paradigmas de desenvolvimento (POO, Funcional)
- Ciclo de vida do software (SDLC)
- Metodologias: Tradicional vs Ágil vs DevOps
- Escopo funcional do sistema

### 📐 Diagramas UML
[🔗 Acessar Diagramas](https://olifrans.github.io/PsiCare/documentacao_uml.html)

Contém:
- Diagrama de Casos de Uso
- Diagrama de Classes
- Diagrama de Sequência (Fluxo de Agendamento)
- Diagrama de Atividade (Fluxo de Atendimento)
- Diagrama de Componentes (Arquitetura C4)

### 🎯 Landing Page Comercial
[🔗 Acessar Landing Page](https://olifrans.github.io/PsiCare)

Página de vendas com:
- Apresentação de valor e benefícios
- Demonstração de funcionalidades
- Tabela de preços e planos
- Depoimentos e prova social
- Links diretos para acesso ao sistema

---

## 🧪 Testes e Validação

### Funcionalidades Testadas
- [x] Autenticação de usuários com múltiplos perfis
- [x] CRUD completo de pacientes
- [x] Agendamento e gestão de consultas
- [x] Registro e visualização de prontuários
- [x] Controle financeiro básico
- [x] Persistência de dados com localStorage
- [x] Interface responsiva (mobile/desktop)
- [x] Navegação entre páginas sem recarregamento

### Compatibilidade
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+
- ✅ Mobile (iOS/Android)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um **Fork** do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/MinhaFeature`
3. Commit suas alterações: `git commit -m 'feat: adiciona minha feature'`
4. Push para a branch: `git push origin feature/MinhaFeature`
5. Abra um **Pull Request**

### Padrões de Código
- Utilize ESLint para validação
- Siga a convenção de commits [Conventional Commits](https://www.conventionalcommits.org/)
- Documente funções complexas com JSDoc

---

## 🐛 Reportando Bugs

Encontrou algum problema? Por favor, abra uma issue detalhando:

1. Descrição clara do bug
2. Passos para reproduzir
3. Comportamento esperado vs. atual
4. Navegador e sistema operacional utilizados
5. Screenshots (se aplicável)

[🔗 Criar Nova Issue](https://github.com/olifrans/PsiCare/issues)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2024 PsiCare

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Autor

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/olifrans">
          <img src="https://avatars.githubusercontent.com/u/olifrans?s=100" width="100px;" alt="Foto do Autor"/><br>
          <sub><b>Olifrans</b></sub>
        </a><br>
        <a href="https://github.com/olifrans/PsiCare/commits?author=olifrans" title="Code">💻</a>
        <a href="#design-olifrans" title="Design">🎨</a>
        <a href="#doc-olifrans" title="Documentation">📖</a>
      </td>
    </tr>
  </table>
</div>

---

## 🙏 Agradecimentos

- À comunidade de desenvolvimento por inspiração e aprendizado contínuo
- Aos profissionais da psicologia que contribuíram com insights sobre as necessidades reais da prática clínica
- Às plataformas GitHub e Vercel pelo suporte ao deploy de projetos open source

---

<p align="center">
  <strong>PsiCare</strong> - Cuidando de quem cuida 🧠💚
</p>

<p align="center">
  <a href="https://olifrans.github.io/PsiCare" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Experimentar_Agora-2c7a7b?style=for-the-badge&logo=github" alt="Experimentar">
  </a>
</p>]