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

router.get('/agendamentos/ocupados', async (req, res) => {
    const { data } = req.query;

    try {
        const agendamentos = await Agendamento.findAll({
            where: { data },
            attributes: ['horario']
        });

        const horariosOcupados = agendamentos.map(agendamento => agendamento.horario);
        res.json(horariosOcupados);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar horários ocupados.' });
    }
});

module.exports = router;