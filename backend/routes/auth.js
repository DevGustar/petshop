// Importa o módulo Express
const express = require('express');
// Cria um roteador para lidar com rotas relacionadas à autenticação
const router = express.Router();

// Importa o bcrypt para criptografar senhas
const bcrypt = require('bcrypt');
// Importa o JWT para gerar tokens de autenticação
const jwt = require('jsonwebtoken');
// Importa o MySQL2 com suporte a async/await
const mysql = require('mysql2/promise');

// Carrega as variáveis de ambiente do .env
require('dotenv').config();

// Define as configurações de conexão com o banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'banco_petshop'
};

// Define o segredo do JWT (usado para assinar os tokens)
const JWT_SECRET = process.env.JWT_SECRET || '9f23b5c7d9e44588a612f1a8ddc5f3fddfd3eabb7e6cfad5ce58768df3b7f45b';

// ROTA: POST /register → Cadastro de novo usuário
router.post('/register', async (req, res) => {
    const { email, senha } = req.body; // Extrai email e senha do corpo da requisição

    if (!email || !senha) { // Verifica se os campos foram preenchidos
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        // Cria conexão com o banco de dados
        const connection = await mysql.createConnection(dbConfig);

        // Verifica se o e-mail já está cadastrado
        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length > 0) {
            await connection.end(); // Encerra a conexão
            return res.status(400).json({ message: 'E-mail já está cadastrado.' });
        }

        // Criptografa a senha com bcrypt
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Insere o novo usuário no banco de dados
        await connection.execute('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [
            email,
            senhaCriptografada
        ]);

        await connection.end(); // Encerra a conexão

        // Retorna sucesso
        res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        // Retorna erro em caso de falha
        res.status(500).json({ message: 'Erro no servidor.', error });
    }
});

// ROTA: POST /login → Login do usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body; // Extrai email e senha do corpo da requisição

    if (!email || !senha) { // Verifica se os campos foram preenchidos
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        // Conecta ao banco
        const connection = await mysql.createConnection(dbConfig);

        // Busca o usuário pelo e-mail
        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        await connection.end(); // Encerra a conexão

        if (rows.length === 0) { // Usuário não encontrado
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const usuario = rows[0]; // Pega o primeiro (e único) usuário encontrado

        // Compara a senha digitada com a senha criptografada no banco
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Gera um token JWT com ID e email do usuário
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
            expiresIn: '1h' // Expira em 1 hora
        });

        // Retorna o token como resposta
        res.json({ token });
    } catch (error) {
        // Em caso de erro
        res.status(500).json({ message: 'Erro no servidor.', error });
    }
});

// Exporta o roteador para ser usado em app.js
module.exports = router;