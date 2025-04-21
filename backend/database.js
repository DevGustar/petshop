// Importa o módulo mysql2 com suporte a Promises
const mysql = require('mysql2/promise');

// Carrega variáveis do arquivo .env para process.env
require('dotenv').config();

// Cria um pool de conexões com o banco de dados MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',       // Endereço do banco (localhost por padrão)
  user: process.env.DB_USER || 'root',            // Usuário do banco (root por padrão)
  password: process.env.DB_PASSWORD || '',        // Senha do banco (vazia por padrão)
  database: process.env.DB_NAME || 'banco_petshop', // Nome do banco de dados
  port: process.env.DB_PORT || 3306,              // Porta do banco (3306 é padrão do MySQL)
  waitForConnections: true,                       // Espera até que haja uma conexão disponível
  connectionLimit: 10,                            // Máximo de conexões simultâneas
  queueLimit: 0                                   // Sem limite de requisições na fila (0 = ilimitado)
});

// Exporta o pool para ser usado em outras partes da aplicação
module.exports = pool;