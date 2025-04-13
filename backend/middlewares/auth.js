// /middlewares/auth.js

const jwt = require('jsonwebtoken');

// Substitua por uma variável de ambiente em produção
const secret = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura';

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Espera formato: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Token mal formatado' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Dados do token disponíveis no request
        next(); // Autorizado, segue para a rota
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
}

module.exports = authMiddleware;
