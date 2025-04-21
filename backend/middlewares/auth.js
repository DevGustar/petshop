// Importa a biblioteca JWT para validar e decodificar tokens
const jwt = require('jsonwebtoken');

// Carrega o segredo JWT definido no arquivo .env
const secret = process.env.JWT_SECRET;

// Middleware de autenticação JWT
function authMiddleware(req, res, next) {
    // Pega o cabeçalho de autorização da requisição (ex: "Bearer <token>")
    const authHeader = req.headers.authorization;

    // Verifica se o cabeçalho existe
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Separa o token da palavra "Bearer"
    const token = authHeader.split(' ')[1];

    // Verifica se o token está presente após o split
    if (!token) {
        return res.status(401).json({ message: 'Token mal formatado' });
    }

    try {
        // Verifica e decodifica o token usando o segredo
        const decoded = jwt.verify(token, secret);

        // Salva os dados decodificados no objeto req (ex: req.user = { id, email })
        req.user = decoded;

        // Continua para o próximo middleware ou rota
        next();
    } catch (err) {
        // Retorna erro se o token estiver inválido ou expirado
        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
}

// Exporta o middleware para ser usado nas rotas protegidas
module.exports = authMiddleware;