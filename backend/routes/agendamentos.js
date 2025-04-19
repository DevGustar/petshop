const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const agendamentoController = require('../controllers/agendamentoController');

router.post('/', auth, upload.single('imagem'), agendamentoController.criarAgendamento);

router.get('/', auth, agendamentoController.listarAgendamentos);

router.get('/:id', auth, agendamentoController.obterAgendamento);

router.put('/:id', auth, upload.single('imagem'), agendamentoController.atualizarAgendamento);

router.delete('/:id', auth, agendamentoController.deletarAgendamento);

module.exports = router;