# 🐾 Sistema de Agendamento de Banhos em Pet Shop

<p align="center">
  <a href="https://www.fecap.br/">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP - Fundação de Comércio Álvares Penteado" height="150">
  </a>
</p>

## 🎓 Fundação Escola de Comércio Álvares Penteado (FECAP)

A FECAP é referência nacional em excelência educacional, com mais de um século de tradição. Este projeto foi desenvolvido como atividade prática para aplicação de conhecimentos em desenvolvimento web e banco de dados.

## 👨‍💻 Desenvolvedor

- [Gustavo Roberto](https://www.linkedin.com/in/gustavo-roberto-0aa488288/)

## 👨‍🏫 Orientador

- [Me. Francisco de Souza Escobar](https://www.linkedin.com/in/francisco-escobar/)

## 📌 Descrição do Projeto

O **Sistema de Agendamento de Banhos em Pet Shop** é uma aplicação web moderna com frontend em HTML/CSS/JS e backend em Node.js + Express. O sistema permite que tutores agendem facilmente horários para seus pets, com uma interface atraente, responsiva e segura.

### Funcionalidades principais:
- Cadastro e login de usuários com senhas criptografadas (bcrypt)
- Login com Google via OAuth 2.0
- Autenticação protegida por JWT
- CRUD completo de agendamentos (criar, listar, editar, excluir)
- Upload de imagens dos pets com preview
- Interface 100% responsiva com animações suaves
- Middleware de proteção de rotas privadas
- Banco de dados MySQL estruturado

### Extras:
- Redirecionamento automático para login ou agendamentos conforme estado da sessão
- Validação de horários disponíveis
- Interface de login e cadastro moderna

## 📁 Estrutura de Pastas

```bash
petshop/
├── backend/
│   ├── auth/
│   │   └── google.js
│   ├── controllers/
│   │   └── agendamentoController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── node_modules/
│   ├── routes/
│   │   ├── agendamentos.js
│   │   ├── auth.js
│   │   └── google.js
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   ├── app.js
│   ├── database.js
│   ├── env.jpg
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   └── style-index.css
│   │   ├── style.css
│   ├── js/
│   │   ├── agendamentos.js
│   │   └── auth.js
│   ├── agendamentos.html
│   ├── cadastro.html
│   ├── index.html
│   └── login.html
│
├── images/
│
├── .gitignore
├── banco_petshop.sql
└── README.md
```

## ⚙️ Instalação & Execução

### 🔗 Acesso Web

Abra o arquivo `frontend/index.html` no navegador.

### 🐘 Backend

```bash
git clone https://github.com/DevGustar/petshop
cd petshop/backend
npm install
node server.js
```

### Banco de Dados

1. Execute o script `banco_petshop.sql` no MySQL
2. Crie um arquivo `.env` com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_USER=root
DB_PORT=3306
DB_PASSWORD=
DB_NAME=petshop
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
FRONTEND_URL=http://127.0.0.1:5500/frontend/login.html
JWT_SECRET=
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d
```

## 🧪 Tecnologias Utilizadas

- Node.js + Express
- MySQL
- JWT (autenticação)
- Bcrypt (criptografia)
- Multer (upload de arquivos)
- HTML5, CSS3, JavaScript
- OAuth 2.0 com Google
- Postman (testes de API)

## 📃 Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

## 📚 Referências

1. [Express.js](https://expressjs.com)
2. [JWT - Autenticação com segurança](https://jwt.io/)
3. [Google OAuth2](https://youtu.be/D8DMj2lQMwo?si=jXSB5B6DrXqYEztW)
4. [HTML5/CSS/JS - W3Schools](https://www.w3schools.com)
5. [Fundação Escola de Comércio Álvares Penteado](https://www.fecap.br)