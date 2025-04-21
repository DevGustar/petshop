// Quando o DOM for carregado completamente...
window.addEventListener('DOMContentLoaded', () => {
    // Recupera o token armazenado localmente (caso exista)
    const token = localStorage.getItem('token');

    // Se houver token, o usuário já está logado, então redireciona para a página de agendamentos
    if (token) {
        window.location.href = 'agendamentos.html';
    }
});

// Segunda escuta para o DOM (para lidar com o formulário de login especificamente)
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o formulário de login pelo ID
    const loginForm = document.getElementById('loginForm');

    // Verifica se o formulário existe na página antes de manipular
    if (loginForm) {
        // Adiciona o listener para o evento de submit
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita o comportamento padrão do form (recarregar a página)

            // Captura os valores dos campos de e-mail e senha
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                // Envia os dados para a rota de login via requisição POST
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, senha }) // Converte os dados em JSON
                });

                const data = await response.json(); // Converte a resposta em JSON

                if (response.ok) {
                    // Se o login foi bem-sucedido, armazena o token localmente
                    localStorage.setItem('token', data.token);

                    // Redireciona para a página de agendamentos
                    window.location.href = 'agendamentos.html';
                } else {
                    // Exibe alerta com a mensagem de erro do backend
                    alert(data.message || 'Falha no login.');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Erro no servidor.');
            }
        });
    }
});

// Captura o formulário de cadastro, se estiver presente na página
const cadastroForm = document.getElementById('cadastroForm');

if (cadastroForm) {
    // Adiciona o evento de submit para cadastro
    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previne recarregamento da página

        // Obtém os dados preenchidos pelo usuário
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            // Faz a requisição para o backend com os dados do novo usuário
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json(); // Converte a resposta em JSON

            if (response.ok) {
                // Exibe sucesso e redireciona para login
                alert('Cadastro realizado com sucesso!');
                window.location.href = 'login.html';
            } else {
                alert(data.message || 'Erro ao cadastrar.');
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            alert('Erro no servidor.');
        }
    });
}

// Botão de login com Google (caso esteja presente na página)
document.getElementById('btnGoogle')?.addEventListener('click', () => {
    // Redireciona para rota de autenticação Google
    window.location.href = 'http://localhost:3000/api/auth/google';
});

// Trata o retorno do Google com token na URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

// Se houver token vindo pela URL, armazena no localStorage e redireciona
if (token) {
    localStorage.setItem('token', token);
    window.location.href = 'agendamentos.html';
}