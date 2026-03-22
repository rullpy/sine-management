# 📒 CRUD de Contatos

Aplicação web completa para gerenciamento de contatos, desenvolvida com Node.js e arquitetura MVC. Permite criar, editar, listar e excluir contatos vinculados a usuários autenticados.

---

## 🚀 Tecnologias Utilizadas

- JavaScript (ES Modules)
- Node.js
- Express
- EJS (Template Engine)
- Webpack
- MongoDB
- Mongoose
- tiny-csrf
- express-session
- connect-mongo
- connect-flash
- bcryptjs
- validator
- helmet

---

## 📌 Funcionalidades

- Cadastro de usuário
- Login e logout com sessão
- Proteção de rotas autenticadas
- Proteção contra CSRF
- Criação de contatos
- Listagem de contatos por usuário
- Edição de contatos
- Exclusão de contatos
- Validação de dados (frontend e backend)
- Feedback com mensagens flash

---

## 🔐 Segurança

- Hash de senha com bcrypt
- Proteção CSRF com tiny-csrf
- Sessões armazenadas no MongoDB
- Headers de segurança com helmet
- Isolamento de dados por usuário

---

## ⚙️ Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/rullpy/crud-agenda
```

### 2. Instalar as dependências
```bash
pnpm install --frozen-lockfile
```

### 3. Configurar variáveis de ambiente
- Crie um arquivo .env na raiz:

```bash
PORT=3000
DB_KEY=sua_string_de_conexao_mongodb
COOKIE_SECRET=seu_cookie_secret
CSRF_SECRET=seu_csrf_secret
```

### 4. Gere o bundle com Webpack

```bash
pnpm run build
```

### 5. Execute o projeto
- Liga a API

```bash
pnpm start
```

### 6. Acesse o projeto no navegador
 
```bash
http://localhost:PORT
```

## 🧠 Arquitetura

O projeto segue padrão MVC:

- **Model:** regras de negócio e conexão com banco  
- **View:** renderização com EJS  
- **Controller:** lógica de controle e fluxo da aplicação  

---

## 🔗 Rotas Principais

| Método | Rota | Descrição |
|--------|------|----------|
| GET | `/` | Lista contatos do usuário |
| GET | `/login` | Tela de login |
| POST | `/login/register` | Autenticação |
| GET | `/sign-up` | Tela de cadastro |
| POST | `/sign-up/register` | Criação de usuário |
| GET | `/contato` | Tela de criação |
| POST | `/contato/register` | Criar contato |
| GET | `/contato/:id` | Editar contato |
| POST | `/contato/edit/:id` | Atualizar contato |
| GET | `/contato/delete/:id` | Deletar contato |

---

# 🧑‍💻 Autor

Emanuel Santos