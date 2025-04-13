// /routes/agendamentos.js

const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const agendamentoController = require('../controllers/agendamentoController');

// Criar agendamento (com imagem) – rota protegida
router.post('/', auth, upload.single('imagem'), agendamentoController.criarAgendamento);

// Listar todos os agendamentos do usuário logado – rota protegida
router.get('/', auth, agendamentoController.listarAgendamentos);

// Buscar agendamento por ID – rota protegida
router.get('/:id', auth, agendamentoController.obterAgendamento);

// Atualizar agendamento por ID (imagem opcional) – rota protegida
router.put('/:id', auth, upload.single('imagem'), agendamentoController.atualizarAgendamento);

// Excluir agendamento por ID – rota protegida
router.delete('/:id', auth, agendamentoController.deletarAgendamento);

module.exports = router;
