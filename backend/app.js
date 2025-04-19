require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const session = require('express-session');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const agendamentoRoutes = require('./routes/agendamentos');
const googleAuthRoutes = require('./routes/google');

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'segredo-temporario',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/auth', googleAuthRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

app.get('/', (req, res) => {
    res.send('API do Petshop está funcionando!');
});

module.exports = app;