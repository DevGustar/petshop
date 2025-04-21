const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

require('dotenv').config();

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'petshop'
};

const JWT_SECRET = process.env.JWT_SECRET || '9f23b5c7d9e44588a612f1a8ddc5f3fddfd3eabb7e6cfad5ce58768df3b7f45b';

router.post('/register', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length > 0) {
            await connection.end();
            return res.status(400).json({ message: 'E-mail já está cadastrado.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await connection.execute('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [
            email,
            senhaCriptografada
        ]);

        await connection.end();
        res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

        await connection.end();

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const usuario = rows[0];

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error });
    }
});

module.exports = router;