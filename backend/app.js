// Carrega variáveis de ambiente do .env para o process.env
require('dotenv').config();

// Importa os módulos principais
const express = require('express');            // Framework web
const cors = require('cors');                  // Permite requisições de outras origens (CORS)
const path = require('path');                  // Lida com caminhos de arquivos

const session = require('express-session');    // Gerencia sessões de usuário
const passport = require('passport');          // Middleware para autenticação

// Importa os arquivos de rotas
const authRoutes = require('./routes/auth');               // Rotas de login/cadastro
const agendamentoRoutes = require('./routes/agendamentos'); // Rotas de agendamentos
const googleAuthRoutes = require('./routes/google');        // Rotas de login com Google

// Inicializa o aplicativo Express
const app = express();

// Ativa o CORS para permitir acesso entre frontend/backend
app.use(cors());

// Permite o uso de JSON nas requisições (body-parser embutido)
app.use(express.json());

// Configura sessões para uso com autenticação
app.use(session({
    secret: 'segredo-temporario', // Segredo da sessão (idealmente usar uma variável de ambiente)
    resave: false,                // Não salva a sessão se nada foi modificado
    saveUninitialized: false      // Não cria sessão até algo ser salvo nela
}));

// Inicializa o Passport
app.use(passport.initialize());

// Ativa o suporte a sessões com Passport
app.use(passport.session());

// Torna a pasta de uploads acessível publicamente
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usa as rotas de autenticação padrão (login/cadastro)
app.use('/api/auth', authRoutes);

// Usa as rotas de login com Google (a mesma base: /api/auth)
app.use('/api/auth', googleAuthRoutes);

// Usa as rotas de agendamentos
app.use('/api/agendamentos', agendamentoRoutes);

// Testa se o servidor está rodando com uma rota simples
app.get('/', (req, res) => {
    res.send('API do Petshop está funcionando!');
});

// Exporta o app para ser usado em server.js
module.exports = app;