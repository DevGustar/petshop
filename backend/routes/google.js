const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../auth/google');
require('dotenv').config();

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
    (req, res) => {
      console.log('🔁 Retorno do Google recebido!');
      console.log('req.user:', req.user);
  
      const user = req.user;
  
      if (!user) {
        return res.status(401).send('Erro: usuário não autenticado');
      }
  
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
  
      console.log('✅ Token JWT gerado:', token);
      res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    }
  );  

module.exports = router;