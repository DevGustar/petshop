// Importa o Express para criar rotas
const express = require('express');

// Importa o Passport para autenticação via Google
const passport = require('passport');

// Importa o JWT para gerar tokens de autenticação
const jwt = require('jsonwebtoken');

// Importa as configurações da estratégia Google (está em auth/google.js)
require('../auth/google');

// Carrega as variáveis de ambiente do .env
require('dotenv').config();

// Cria um roteador para lidar com rotas relacionadas ao Google Login
const router = express.Router();

// ROTA: GET /google
// Inicia o fluxo de autenticação com o Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'] // Solicita acesso ao perfil e e-mail do usuário
}));

// ROTA: GET /google/callback
// Essa rota é chamada automaticamente pelo Google após o login
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }), // Verifica se o login foi bem-sucedido
    (req, res) => {
        console.log('🔁 Retorno do Google recebido!');
        console.log('req.user:', req.user); // Exibe o usuário retornado pelo Google

        const user = req.user; // Extrai o usuário da requisição

        if (!user) {
            // Se não houver usuário autenticado, retorna erro
            return res.status(401).send('Erro: usuário não autenticado');
        }

        // Cria um token JWT com id e email do usuário autenticado
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token expira em 1 hora
        });

        console.log('✅ Token JWT gerado:', token);

        // Redireciona para o frontend com o token no parâmetro da URL
        res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    }
);

// Exporta o roteador para ser usado em app.js
module.exports = router;