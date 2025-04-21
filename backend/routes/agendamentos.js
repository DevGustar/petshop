// Importa o Express para criar rotas
const express = require('express');
// Cria um novo objeto de roteador do Express
const router = express.Router();

// Importa o middleware de autenticação (verifica se o usuário está logado)
const auth = require('../middlewares/auth');

// Importa o middleware de upload de imagem (usando Multer)
const upload = require('../middlewares/upload');

// Importa o controller que contém a lógica dos agendamentos
const agendamentoController = require('../controllers/agendamentoController');

// Rota para criar um novo agendamento
// Requer autenticação e envio de imagem (upload.single)
router.post('/', auth, upload.single('imagem'), agendamentoController.criarAgendamento);

// Rota para listar todos os agendamentos do usuário autenticado
router.get('/', auth, agendamentoController.listarAgendamentos);

// Rota para obter um agendamento específico pelo ID (do usuário autenticado)
router.get('/:id', auth, agendamentoController.obterAgendamento);

// Rota para atualizar um agendamento (por ID) — também permite alterar imagem
router.put('/:id', auth, upload.single('imagem'), agendamentoController.atualizarAgendamento);

// Rota para deletar um agendamento (por ID) do usuário autenticado
router.delete('/:id', auth, agendamentoController.deletarAgendamento);

// Exporta o roteador para ser usado em app.js
module.exports = router;