const db = require('../database');
const path = require('path');
const fs = require('fs');

module.exports = {
    // Criar um novo agendamento
    async criarAgendamento(req, res) {
        const { nome_pet, raca, data, horario, observacoes } = req.body;
        const usuarioId = req.user.id;

        if (!req.file) {
            return res.status(400).json({ message: 'Imagem do pet é obrigatória.' });
        }

        const imagem = req.file.filename;

        try {
            const query = `
        INSERT INTO agendamentos (usuario_id, nome_pet, raca, data, horario, observacoes, imagem)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
            await db.execute(query, [usuarioId, nome_pet, raca, data, horario, observacoes, imagem]);

            res.status(201).json({ message: 'Agendamento criado com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar agendamento.', error });
        }
    },

    // Listar todos os agendamentos do usuário logado
    async listarAgendamentos(req, res) {
        const usuarioId = req.user.id;

        try {
            const [rows] = await db.execute(
                'SELECT * FROM agendamentos WHERE usuario_id = ?',
                [usuarioId]
            );
            res.json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar agendamentos.', error });
        }
    },

    // Obter agendamento específico
    async obterAgendamento(req, res) {
        const { id } = req.params;
        const usuarioId = req.user.id;

        try {
            const [rows] = await db.execute(
                'SELECT * FROM agendamentos WHERE id = ? AND usuario_id = ?',
                [id, usuarioId]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Agendamento não encontrado.' });
            }

            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar agendamento.', error });
        }
    },

    // Atualizar agendamento
    async atualizarAgendamento(req, res) {
        const { id } = req.params;
        const { nome_pet, raca, data, horario, observacoes } = req.body;
        const usuarioId = req.user.id;

        try {
            const [rows] = await db.execute(
                'SELECT * FROM agendamentos WHERE id = ? AND usuario_id = ?',
                [id, usuarioId]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Agendamento não encontrado.' });
            }

            let imagem = rows[0].imagem;
            if (req.file) {
                // Deleta imagem antiga
                const imagemAntiga = path.join(__dirname, '..', 'uploads', imagem);
                if (fs.existsSync(imagemAntiga)) fs.unlinkSync(imagemAntiga);

                imagem = req.file.filename;
            }

            await db.execute(
                `UPDATE agendamentos SET nome_pet = ?, raca = ?, data = ?, horario = ?, observacoes = ?, imagem = ?
         WHERE id = ? AND usuario_id = ?`,
                [nome_pet, raca, data, horario, observacoes, imagem, id, usuarioId]
            );

            res.json({ message: 'Agendamento atualizado com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar agendamento.', error });
        }
    },

    // Deletar agendamento
    async deletarAgendamento(req, res) {
        const { id } = req.params;
        const usuarioId = req.user.id;

        try {
            const [rows] = await db.execute(
                'SELECT * FROM agendamentos WHERE id = ? AND usuario_id = ?',
                [id, usuarioId]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Agendamento não encontrado.' });
            }

            // Exclui a imagem do servidor
            const caminhoImagem = path.join(__dirname, '..', 'uploads', rows[0].imagem);
            if (fs.existsSync(caminhoImagem)) fs.unlinkSync(caminhoImagem);

            await db.execute(
                'DELETE FROM agendamentos WHERE id = ? AND usuario_id = ?',
                [id, usuarioId]
            );

            res.json({ message: 'Agendamento excluído com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar agendamento.', error });
        }
    }
};
