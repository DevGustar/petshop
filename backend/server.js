// Carrega variáveis de ambiente do arquivo .env para process.env
require('dotenv').config();

// Importa a instância do aplicativo Express definida em app.js
const app = require('./app');

// Define a porta do servidor a partir do .env ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor e escuta na porta definida
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`); // Mensagem exibida no terminal quando o servidor inicia
});