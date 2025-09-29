function cadastrarColaborador() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var telefone = document.getElementById('telefone').value;
    var endereco = document.getElementById('endereco').value;

    // Verificar se todos os campos foram preenchidos
    if (nome.trim() === '' || email.trim() === '' || senha.trim() === '' || telefone.trim() === '' || endereco.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Verificar se o email já está cadastrado
    var colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
    var colaboradorExistente = colaboradores.find(function (colaborador) {
        return colaborador.email === email;
    });

    if (colaboradorExistente) {
        alert('Este email já está cadastrado. Por favor, use outro.');
        return;
    }

    // Salvar colaborador no Local Storage
    salvarColaboradorLocalStorage(nome, email, senha, telefone, endereco);

    // Limpar campos após o cadastro
    limparCampos();

    // Feedback de sucesso
    alert('Cadastro realizado com sucesso! Redirecionando para página de login.');

    // Redirecionar para a página de login após o cadastro
    window.location.href = "PaginaLogin.html";
}

function salvarColaboradorLocalStorage(nome, email, senha, telefone, endereco) {
    var colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
    colaboradores.push({ nome: nome, email: email, senha: senha, telefone: telefone, endereco: endereco });
    localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('endereco').value = '';
}
