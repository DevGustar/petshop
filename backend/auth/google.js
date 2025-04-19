const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../database');
require('dotenv').config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value;

            try {
                const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

                if (rows.length > 0) {
                    const usuarioExistente = {
                        id: rows[0].id,
                        email: rows[0].email,
                    };
                    return done(null, usuarioExistente);
                } else {
                    const [result] = await db.execute(
                        'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
                        [email, '']
                    );

                    const [novo] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [result.insertId]);

                    const novoUsuario = {
                        id: novo[0].id,
                        email: novo[0].email,
                    };
                    return done(null, novoUsuario);
                }
            } catch (err) {
                return done(err);
            }
        }
    )
);