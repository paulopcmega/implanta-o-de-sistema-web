// Função para redirecionar para a página de cadastro
function PagColaborador() {
    window.location.href = "cadastroColaborador.html";
}

// Função para validar o usuário no login
function ValidarUsuario() {
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();

    // Verificar se todos os campos foram preenchidos
    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Buscar colaboradores do localStorage
    var colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];

    // Verificar se existe um colaborador com as credenciais fornecidas
    var colaboradorValido = colaboradores.find(function (colaborador) {
        return (colaborador.email === username || colaborador.nome === username) && colaborador.senha === password;
    });

    if (colaboradorValido) {
        alert('Login bem-sucedido. Bem-vindo(a), ' + colaboradorValido.nome + '!');
        // Armazenar informações do usuário logado
        localStorage.setItem('usuarioLogado', JSON.stringify(colaboradorValido));
        redirecionarMenuAutenticado();
    } else {
        alert('Credenciais inválidas. Por favor, tente novamente.');
    }
}

// Função para redirecionar e ativar links do menu após o login
function redirecionarMenuAutenticado() {
    // Redirecionar para a página principal do sistema após o login
    window.location.href = "Dashboard.html";
}

// Verificar se há um usuário logado ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        redirecionarMenuAutenticado();
    } else if (usuarioLogado) {
        // Desativar os links do menu se não estiver logado
        document.getElementById('linkDashboard').href = 'PaginaLogin.html';
        document.getElementById('linkFinanceiro').href = 'PaginaLogin.html';
    }
});
