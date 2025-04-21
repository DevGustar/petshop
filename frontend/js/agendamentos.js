document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const agendamentoForm = document.getElementById('agendamentoForm');
    const container = document.getElementById('agendamentosContainer');
    const imagemInput = agendamentoForm.querySelector('input[name="imagem"]');
    const preview = document.getElementById('previewImagem');

    let modoEdicao = false;
    let idEmEdicao = null;

    listarAgendamentos();

    // Preview da imagem
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

    // Enviar ou atualizar agendamento
    agendamentoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(agendamentoForm);

        // Obter a data e o horário do formulário
        const data = formData.get('data'); // Formato esperado: yyyy-mm-dd
        const horario = formData.get('horario'); // Formato esperado: hh:mm

        // Validar se a data é um dia útil
        const [ano, mes, dia] = data.split('-').map(Number); // Dividir a data manualmente
        const dataObj = new Date(ano, mes - 1, dia); // Criar a data sem interferência de fuso horário
        const diaSemana = dataObj.getDay(); // 0 = Domingo, 6 = Sábado
        if (diaSemana === 0 || diaSemana === 6) {
            alert('Agendamentos só podem ser feitos de segunda a sexta.');
            return;
        }

        // Validar se o horário está entre 8h e 18h
        const [horas, minutos] = horario.split(':').map(Number);
        if (horas < 8 || horas > 18 || (horas === 18 && minutos > 0)) {
            alert('O horário deve estar entre 8h e 18h.');
            return;
        }

        // Validar se a data e o horário não estão no passado
        const agora = new Date();
        const dataHoraAgendamento = new Date(ano, mes - 1, dia, horas, minutos, 0, 0); // Criar a data e hora sem fuso horário

        if (dataHoraAgendamento < agora) {
            alert('Não é possível agendar para uma data ou horário que já passou.');
            return;
        }

        const url = modoEdicao
            ? `http://localhost:3000/api/agendamentos/${idEmEdicao}`
            : 'http://localhost:3000/api/agendamentos';

        const method = modoEdicao ? 'PUT' : 'POST';

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

                agendamentos.forEach((item) => {
                    // Formatar data
                    const dataObj = new Date(item.data);
                    const dataFormatada = `${String(dataObj.getDate()).padStart(2, '0')}/${String(dataObj.getMonth() + 1).padStart(2, '0')}/${dataObj.getFullYear()}`;

                    // Usar o horário diretamente do campo item.horario
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

    // Função global para editar
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

                // Atualizar o texto do botão principal
                agendamentoForm.querySelector('button').textContent = 'Salvar Alterações';

                // Exibir o botão "Cancelar Alteração"
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

    const cancelarEdicaoBtn = document.getElementById('cancelarEdicao');

    cancelarEdicaoBtn.addEventListener('click', () => {
        // Resetar o formulário
        agendamentoForm.reset();
        preview.style.display = 'none';

        // Reverter o estado de edição
        modoEdicao = false;
        idEmEdicao = null;

        // Atualizar o texto do botão principal
        agendamentoForm.querySelector('button').textContent = 'Agendar';

        // Ocultar o botão "Cancelar Alteração"
        cancelarEdicaoBtn.style.display = 'none';
    });

    // Função global para excluir
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

// Logout simples
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}
