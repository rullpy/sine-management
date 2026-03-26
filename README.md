# 📒 Companies and Job Vacancies Management System (SINE)

Web application for managing **companies (contacts)** and **job vacancies**, featuring user authentication and linking vacancies to companies.

---

## 🚀 Technologies

- Node.js, Express  
- MongoDB, Mongoose  
- EJS, Webpack  
- express-session, connect-mongo  
- tiny-csrf, helmet  
- bcryptjs, validator  

---

## 📌 Features

- User registration and login  
- CRUD for companies (contacts)  
- Create job vacancies linked to a company  
- List vacancies by company  
- Data validation and flash messages  
- Protected routes with authentication  

---

## 🔗 Routes

### 👤 Auth
- `GET /sign-up`  
- `POST /sign-up/register`  
- `GET /login`  
- `POST /login/register`  
- `GET /login/logout`  

### 🏢 Companies
- `GET /contato`  
- `POST /contato/register`  
- `GET /contato/:id`  
- `POST /contato/edit/:id`  
- `GET /contato/delete/:id`  

### 💼 Vacancies
- `GET /contato/cria-vaga/:id`  
- `POST /contato/vaga-criada/:id`  
- `GET /contato/list-vagas/:id`  

---

## ⚙️ Installation
-before starting configure a .env file

```bash
git clone https://github.com/rullpy/crud-agenda
pnpm install
pnpm run build
pnpm start
```

