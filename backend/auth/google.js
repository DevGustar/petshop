// Importa o módulo principal do Passport.js
const passport = require('passport');

// Importa a estratégia do Google OAuth 2.0
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Importa o módulo de conexão com o banco de dados
const db = require('../database');

// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Configura o uso da estratégia do Google com o Passport
passport.use(
    new GoogleStrategy(
        {
            // ID do cliente Google, armazenado em variável de ambiente
            clientID: process.env.GOOGLE_CLIENT_ID,

            // Segredo do cliente Google
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            // URL para onde o Google vai redirecionar após o login
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },

        // Função executada após o login com sucesso no Google
        async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value; // Extrai o e-mail do perfil do Google

            try {
                // Verifica se já existe um usuário com este e-mail no banco de dados
                const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

                if (rows.length > 0) {
                    // Se o usuário já existe, retorna o objeto com ID e e-mail
                    const usuarioExistente = {
                        id: rows[0].id,
                        email: rows[0].email,
                    };
                    return done(null, usuarioExistente); // Finaliza a autenticação
                } else {
                    // Caso o usuário não exista, insere um novo com senha vazia
                    const [result] = await db.execute(
                        'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
                        [email, ''] // Senha vazia, pois o login é via Google
                    );

                    // Busca o novo usuário recém-criado
                    const [novo] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [result.insertId]);

                    // Cria o objeto de retorno com ID e e-mail
                    const novoUsuario = {
                        id: novo[0].id,
                        email: novo[0].email,
                    };
                    return done(null, novoUsuario); // Finaliza a autenticação
                }
            } catch (err) {
                return done(err); // Se houver erro, passa ele adiante para o Passport tratar
            }
        }
    )
);