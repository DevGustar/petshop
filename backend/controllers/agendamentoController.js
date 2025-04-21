// Importa o módulo de conexão com o banco de dados MySQL
const db = require('../database');

// Importa o módulo 'path' para manipulação de caminhos de arquivos e diretórios
const path = require('path');

// Importa o módulo 'fs' para operações no sistema de arquivos (ex: excluir imagem)
const fs = require('fs');

// Exporta um objeto contendo todas as funções relacionadas ao CRUD de agendamentos
module.exports = {
    
    // Função para criar um novo agendamento
    async criarAgendamento(req, res) {
        // Extrai os dados enviados no corpo da requisição
        const { nome_pet, raca, data, horario, observacoes } = req.body;

        // Pega o ID do usuário logado (vem do token JWT decodificado pelo middleware)
        const usuarioId = req.user.id;

        // Verifica se uma imagem foi enviada no formulário
        if (!req.file) {
            // Se não tiver imagem, retorna erro
            return res.status(400).json({ message: 'Imagem do pet é obrigatória.' });
        }

        // Armazena o nome do arquivo da imagem
        const imagem = req.file.filename;

        try {
            // Verifica se já existe um agendamento para a mesma data e horário
            const [agendamentosExistentes] = await db.execute(
                'SELECT * FROM agendamentos WHERE data = ? AND horario = ?',
                [data, horario]
            );

            // Se encontrar agendamento, retorna erro de horário ocupado
            if (agendamentosExistentes.length > 0) {
                return res.status(400).json({
                    message: 'Horário indisponível. Já existe um agendamento para esse dia e horário.'
                });
            }

            // Query para inserir novo agendamento no banco de dados
            const query = `
                INSERT INTO agendamentos (usuario_id, nome_pet, raca, data, horario, observacoes, imagem)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            // Executa a query com os dados fornecidos
            await db.execute(query, [usuarioId, nome_pet, raca, data, horario, observacoes, imagem]);

            // Retorna sucesso
            res.status(201).json({ message: 'Agendamento criado com sucesso.' });
        } catch (error) {
            // Se ocorrer erro, retorna erro interno
            res.status(500).json({ message: 'Erro ao criar agendamento.', error });
        }
    },

    // Função para listar os agendamentos do usuário logado
    async listarAgendamentos(req, res) {
        // Recupera o ID do usuário logado
        const usuarioId = req.user.id;

        try {
            // Busca todos os agendamentos desse usuário
            const [rows] = await db.execute(
                'SELECT * FROM agendamentos WHERE usuario_id = ?',
                [usuarioId]
            );

            // Retorna os agendamentos encontrados
            res.json(rows);
        } catch (error) {
            // Retorna erro em caso de falha na consulta
            res.status(500).json({ message: 'Erro ao listar agendamentos.', error });
        }
    },

    // Função para obter um único agendamento pelo ID
    async obterAgendamento(req, res) {
        // Pega o ID do agendamento da URL
        const { id } = req.params;

        // Pega o ID do usuário logado
        const usuarioId = req.user.id;

        try {
            // Busca o agendamento com ID e usuário correspondente
            const [rows] = await db.execute(
                'SELECT * FROM agendamentos WHERE id = ? AND usuario_id = ?',
                [id, usuarioId]
            );

            // Se não encontrar nenhum, retorna erro 404
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Agendamento não encontrado.' });
            }

            // Retorna o agendamento encontrado
            res.json(rows[0]);
        } catch (error) {
            // Retorna erro interno se falhar
            res.status(500).json({ message: 'Erro ao buscar agendamento.', error });
        }
    },

    // Função para atualizar um agendamento existente
    async atualizarAgendamento(req, res) {
        // Pega o ID da URL
        const { id } = req.params;

        // Pega os dados do corpo da requisição
        const { nome_pet, raca, data, horario, observacoes } = req.body;

        // ID do usuário logado
        const usuarioId = req.user.id;

        try {
            // Verifica se o agendamento existe para o usuário
            const [rows] = await db.execute(
                'SELECT * FROM agendamentos WHERE id = ? AND usuario_id = ?',
                [id, usuarioId]
            );

            // Se não encontrar, retorna erro
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Agendamento não encontrado.' });
            }

            // Verifica se o novo horário já está ocupado por outro agendamento
            const [conflitos] = await db.execute(
                'SELECT * FROM agendamentos WHERE data = ? AND horario = ? AND id != ?',
                [data, horario, id]
            );

            // Se houver conflito, retorna erro
            if (conflitos.length > 0) {
                return res.status(400).json({ message: 'Já existe um agendamento neste horário.' });
            }

            // Armazena o nome da imagem atual
            let imagem = rows[0].imagem;

            // Se o usuário enviou nova imagem
            if (req.file) {
                // Caminho da imagem antiga
                const imagemAntiga = path.join(__dirname, '..', 'uploads', imagem);

                // Se o arquivo da imagem antiga existir, deleta
                if (fs.existsSync(imagemAntiga)) fs.unlinkSync(imagemAntiga);

                // Atualiza nome da nova imagem
                imagem = req.file.filename;
            }

            // Atualiza os dados no banco
            await db.execute(
                `UPDATE agendamentos SET nome_pet = ?, raca = ?, data = ?, horario = ?, observacoes = ?, imagem = ?
                WHERE id = ? AND usuario_id = ?`,
                [nome_pet, raca, data, horario, observacoes, imagem, id, usuarioId]
            );

            // Retorna mensagem de sucesso
            res.json({ message: 'Agendamento atualizado com sucesso.' });
        } catch (error) {
            // Retorna erro interno
            res.status(500).json({ message: 'Erro ao atualizar agendamento.', error });
        }
    },

    // Função para excluir um agendamento
    async deletarAgendamento(req, res) {
        // ID do agendamento (URL)
        const { id } = req.params;

        // ID do usuário logado
        const usuarioId = req.user.id;

        try {
            // Verifica se o agendamento existe
            const [rows] = await db.execute(
                'SELECT * FROM agendamentos WHERE id = ? AND usuario_id = ?',
                [id, usuarioId]
            );

            // Se não existir, retorna erro 404
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Agendamento não encontrado.' });
            }

            // Caminho da imagem a ser excluída
            const imagemPath = path.join(__dirname, '..', 'uploads', rows[0].imagem);

            // Se a imagem existir, exclui do sistema de arquivos
            if (fs.existsSync(imagemPath)) {
                fs.unlinkSync(imagemPath);
            }

            // Exclui o agendamento do banco
            await db.execute(
                'DELETE FROM agendamentos WHERE id = ? AND usuario_id = ?',
                [id, usuarioId]
            );

            // Retorna sucesso
            res.json({ message: 'Agendamento excluído com sucesso.' });
        } catch (error) {
            // Retorna erro interno
            res.status(500).json({ message: 'Erro ao deletar agendamento.', error });
        }
    }
};