// Aguarda o carregamento total do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Recupera o token de autenticação do localStorage
    const token = localStorage.getItem('token');

    // Se não houver token, redireciona para a tela de login
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Referência ao formulário de agendamento
    const agendamentoForm = document.getElementById('agendamentoForm');

    // Container onde os cards de agendamentos serão inseridos
    const container = document.getElementById('agendamentosContainer');

    // Campo de imagem do formulário
    const imagemInput = agendamentoForm.querySelector('input[name="imagem"]');

    // Imagem de preview que aparece após selecionar arquivo
    const preview = document.getElementById('previewImagem');

    // Variável para controlar se está no modo edição ou não
    let modoEdicao = false;

    // ID do agendamento que está sendo editado (se aplicável)
    let idEmEdicao = null;

    // Carrega agendamentos já existentes do usuário
    listarAgendamentos();

    // Exibe o preview da imagem quando um novo arquivo é selecionado
    imagemInput.addEventListener('change', () => {
        const file = imagemInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                preview.src = reader.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            preview.style.display = 'none';
        }
    });

    // Envio do formulário de agendamento (criação ou atualização)
    agendamentoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Cria um objeto FormData para enviar arquivos junto com os dados
        const formData = new FormData(agendamentoForm);

        // Validações de data e horário
        const data = formData.get('data');
        const horario = formData.get('horario');

        // Transforma a data em objeto Date para validação do dia da semana
        const [ano, mes, dia] = data.split('-').map(Number);
        const dataObj = new Date(ano, mes - 1, dia);
        const diaSemana = dataObj.getDay();
        if (diaSemana === 0 || diaSemana === 6) {
            alert('Agendamentos só podem ser feitos de segunda a sexta.');
            return;
        }

        // Validação de faixa de horário (08h às 18h)
        const [horas, minutos] = horario.split(':').map(Number);
        if (horas < 8 || horas > 18 || (horas === 18 && minutos > 0)) {
            alert('O horário deve estar entre 8h e 18h.');
            return;
        }

        // Valida se a data/hora do agendamento está no futuro
        const agora = new Date();
        const dataHoraAgendamento = new Date(ano, mes - 1, dia, horas, minutos, 0, 0);
        if (dataHoraAgendamento < agora) {
            alert('Não é possível agendar para uma data ou horário que já passou.');
            return;
        }

        // Define a URL e método dependendo se está editando ou criando
        const url = modoEdicao
            ? `http://localhost:3000/api/agendamentos/${idEmEdicao}`
            : 'http://localhost:3000/api/agendamentos';
        const method = modoEdicao ? 'PUT' : 'POST';

        // Envia os dados para o backend
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert(modoEdicao ? 'Agendamento atualizado!' : 'Agendamento criado com sucesso!');
                agendamentoForm.reset();
                preview.style.display = 'none';
                modoEdicao = false;
                idEmEdicao = null;
                agendamentoForm.querySelector('button').textContent = 'Agendar';
                listarAgendamentos();
            } else {
                alert(data.message || 'Erro no envio.');
            }
        } catch (err) {
            console.error(err);
            alert('Erro no servidor.');
        }
    });

    // Função que lista os agendamentos do usuário
    async function listarAgendamentos() {
        container.innerHTML = '<p>Carregando...</p>';
        try {
            const response = await fetch('http://localhost:3000/api/agendamentos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const agendamentos = await response.json();

            if (Array.isArray(agendamentos)) {
                container.innerHTML = '';

                if (agendamentos.length === 0) {
                    container.innerHTML = '<p>Nenhum agendamento encontrado.</p>';
                }

                // Para cada agendamento, cria um "card" com as informações
                agendamentos.forEach((item) => {
                    const dataObj = new Date(item.data);
                    const dataFormatada = `${String(dataObj.getDate()).padStart(2, '0')}/${String(dataObj.getMonth() + 1).padStart(2, '0')}/${dataObj.getFullYear()}`;
                    const [horas, minutos] = item.horario.split(':');
                    const horarioFormatado = minutos === '00' ? `${horas}h` : `${horas}h${minutos}`;

                    const card = document.createElement('div');
                    card.classList.add('agendamento');
                    card.innerHTML = `
                        <h3>${item.nome_pet} - ${item.raca}</h3>
                        <p>📅 ${dataFormatada} às ${horarioFormatado}</p>
                        <p>${item.observacoes || 'Sem observações'}</p>
                        <img src="http://localhost:3000/uploads/${item.imagem}" alt="${item.nome_pet}" width="200" />
                        <div class="button-container">
                            <button class="editButton" onclick="editarAgendamento(${item.id})">Editar</button>
                            <button onclick="excluirAgendamento(${item.id})">Excluir</button>
                        </div>`;
                    container.appendChild(card);
                });
            } else {
                container.innerHTML = '<p>Erro ao carregar dados.</p>';
            }
        } catch (err) {
            console.error(err);
            container.innerHTML = '<p>Erro no servidor.</p>';
        }
    }

    // Torna a função de editar acessível globalmente (via botão)
    window.editarAgendamento = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/agendamentos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                agendamentoForm.nome_pet.value = data.nome_pet;
                agendamentoForm.raca.value = data.raca;
                agendamentoForm.data.value = data.data;
                agendamentoForm.horario.value = data.horario;
                agendamentoForm.observacoes.value = data.observacoes || '';
                preview.src = `http://localhost:3000/uploads/${data.imagem}`;
                preview.style.display = 'block';

                modoEdicao = true;
                idEmEdicao = id;
                agendamentoForm.querySelector('button').textContent = 'Salvar Alterações';
                document.getElementById('cancelarEdicao').style.display = 'inline-block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert(data.message || 'Erro ao carregar agendamento.');
            }
        } catch (err) {
            console.error(err);
            alert('Erro no servidor.');
        }
    };

    // Botão que cancela o modo edição e reseta o formulário
    const cancelarEdicaoBtn = document.getElementById('cancelarEdicao');
    cancelarEdicaoBtn.addEventListener('click', () => {
        agendamentoForm.reset();
        preview.style.display = 'none';
        modoEdicao = false;
        idEmEdicao = null;
        agendamentoForm.querySelector('button').textContent = 'Agendar';
        cancelarEdicaoBtn.style.display = 'none';
    });

    // Torna a função de exclusão acessível globalmente (via botão)
    window.excluirAgendamento = async (id) => {
        if (!confirm('Deseja realmente excluir este agendamento?')) return;

        try {
            const response = await fetch(`http://localhost:3000/api/agendamentos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert('Agendamento excluído com sucesso!');
                listarAgendamentos();
            } else {
                alert(data.message || 'Erro ao excluir.');
            }
        } catch (err) {
            console.error(err);
            alert('Erro no servidor.');
        }
    };
});

// Função de logout: remove o token do localStorage e redireciona para o login
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}