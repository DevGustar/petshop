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

O **Sistema de Agendamento de Banhos em Pet Shop** é uma aplicação web completa com frontend em HTML/CSS e backend em Node.js e Express, focada em facilitar o processo de agendamento de banhos para animais de estimação.

Funcionalidades principais:
- Cadastro e login de usuários com senhas criptografadas (bcrypt)
- Autenticação via JWT
- CRUD completo de agendamentos (criar, listar, editar, excluir)
- Upload de imagens dos pets com preview no frontend
- Interface responsiva com animações suaves
- Middleware de proteção para rotas privadas
- Banco de dados MySQL estruturado

Funcionalidades extras:
- Preview de imagem antes do envio
- Edição de agendamento com imagem atualizada
- Sessão protegida por JWT (com redirect automático)

## 📁 Estrutura de Pastas

```
petshop/
├── backend/
│   ├── controllers/
│   │   └── agendamentoController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   ├── routes/
│   │   ├── agendamentos.js
│   │   └── auth.js
│   ├── uploads/
│   ├── .env
│   ├── app.js
│   ├── database.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── css/
│   │   ├── style.css
│   │   └── style-index.css
│   ├── js/
│   │   ├── agendamentos.js
│   │   └── auth.js
│   ├── agendamentos.html
│   ├── cadastro.html
│   ├── index.html
│   └── login.html
├── banco_petshop.sql
└── README.md
```

## ⚙️ Instalação & Execução

### 🔗 Versão Web

Basta abrir `frontend/index.html` em qualquer navegador.

### 🐘 Backend (Node.js)

```bash
git clone https://github.com/DevGustar/petshop
cd petshop/backend
npm install
node server.js
```

### Banco de Dados

1. Execute o script `banco_petshop.sql` no seu MySQL Workbench
2. Crie um arquivo `.env` com as informações:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=petshop
JWT_SECRET=sua_chave_secreta
```

> Certifique-se de que seu banco MySQL esteja rodando

## 🧪 Ferramentas Utilizadas

- [Node.js](https://nodejs.org/) + Express
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/) para autenticação
- [Multer](https://www.npmjs.com/package/multer) para upload de imagens
- [Bcrypt](https://www.npmjs.com/package/bcrypt) para criptografar senhas
- [Postman](https://www.postman.com/) para testes de API
- [HTML5/CSS3/JS](https://developer.mozilla.org/)

## 📃 Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

## 📚 Referências

1. [Autenticação com Node.js e MongoDB com JWT - Login e Registro com Node.js](https://youtu.be/qEBoZ8lJR3k?si=vz2f9aIXsP35-Bwv)
2. [Saiba mais sobre Express](https://expressjs.com)
3. [JWT (JSON Web Token - Autenticação e Segurança)](https://youtu.be/Gyq-yeot8qM?si=NMZOaLZOsNVxCSfg)
4. [Fundação Escola de Comércio Álvares Penteado](https://www.fecap.br)
5. [Para mais informações sobre qualquer linguagem](https://www.w3schools.com/)