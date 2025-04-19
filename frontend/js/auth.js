document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'agendamentos.html';
                } else {
                    alert(data.message || 'Falha no login.');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Erro no servidor.');
            }
        });
    }
});

const cadastroForm = document.getElementById('cadastroForm');

if (cadastroForm) {
    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (response.ok) {
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

document.getElementById('btnGoogle')?.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
});

// Quando voltar do Google com token na URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
    localStorage.setItem('token', token);
    window.location.href = 'agendamentos.html';
}
