
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

## 👨‍🏫 Orientadores

- [Dr. Eduardo Savino Gomes](https://www.linkedin.com/in/eduardo-savino-gomes-77833a10/)
- [Me. Francisco de Souza Escobar](https://www.linkedin.com/in/francisco-escobar/)
- [Me. Aimar Martins Lopes](https://www.linkedin.com/in/aimarlopes/)
- [Dr. Jose Carlos Buesso Junior](https://www.linkedin.com/in/jbuesso/)
- [Dr. Victor Rosetti de Quiroz](https://www.linkedin.com/in/victorbarq/?originalSubdomain=br)

## 📌 Descrição do Projeto

O **Sistema de Agendamento de Banhos em Pet Shop** é uma aplicação web completa com frontend em HTML/CSS e backend em Node.js + Express.js, focada em facilitar o processo de agendamento de banhos para animais de estimação.

Entre as funcionalidades principais, o sistema oferece:
- Cadastro e login de usuários com senhas criptografadas (bcrypt)
- Autenticação via JWT
- CRUD completo de agendamentos
- Upload de imagens dos pets com exibição no frontend
- Interface simples e funcional para gerenciar os agendamentos
- Middleware de proteção para rotas privadas
- Banco de dados estruturado em MySQL

Funcionalidades extras:
- Login com conta Google (OAuth2)
- Preview da imagem antes do envio
- Bloqueio de horários duplicados
- Expiração automática de sessão

## 📁 Estrutura de Pastas

```
petshop/
├── documents/
├── images/
├── src/
│   ├── backend/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── uploads/
│   │   ├── .env.example
│   │   ├── app.js
│   │   └── package.json
│   ├── frontend/
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── cadastro.html
│   │   ├── dashboard.html
│   │   ├── agendamentos.html
│   │   └── css/
│   │       └── style.css
│   └── banco_petshop.sql
├── .gitignore
└── readme.md
```

## ⚙️ Instalação

### 🔗 Versão Web

Nenhuma instalação necessária! Basta acessar o site [aqui](#).

### 🐘 Backend

1. Clone o repositório:
```bash
git clone https://github.com/DevGustar/petshop
cd petshop/src/backend
```

2. Instale as dependências:
```bash
npm install express mysql2 bcrypt jsonwebtoken multer dotenv cors
```

> Bibliotecas utilizadas:
> - [Express](https://expressjs.com/) – Servidor web e gerenciamento de rotas
> - [MySQL2](https://www.npmjs.com/package/mysql2) – Conexão com banco de dados
> - [Bcrypt](https://www.npmjs.com/package/bcrypt) – Criptografia de senhas
> - [JWT](https://www.npmjs.com/package/jsonwebtoken) – Autenticação com tokens
> - [Multer](https://www.npmjs.com/package/multer) – Upload de imagens
> - [Dotenv](https://www.npmjs.com/package/dotenv) – Variáveis de ambiente
> - [CORS](https://www.npmjs.com/package/cors) – Permitir requisições entre domínios

3. Configure o `.env` com base no `.env.example`

4. Inicie o servidor:
```bash
node app.js
```

## 🧪 Configuração para Desenvolvimento

- Node.js e npm
- MySQL
- Extensões recomendadas: Postman

### Banco de Dados

1. Importe o `banco_petshop.sql` no seu MySQL.
2. Verifique o `.env`.

## 🔐 Exemplo de .env

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=petshop
JWT_SECRET=sua_chave_secreta
```

## 📃 Licença

Este projeto está licenciado sob a [X License](LICENSE).

## 📚 Referências

1.
2.
3.
4.
5.