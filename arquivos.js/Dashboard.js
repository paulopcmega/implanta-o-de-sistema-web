var numeroChamado = 0;

function removerServicoLocalStorage(Nchamado) {
    var servicos = JSON.parse(localStorage.getItem('servicos')) || [];
    var novosServicos = servicos.filter(function (servico) {
        return servico.Nchamado !== Nchamado;
    });
    localStorage.setItem('servicos', JSON.stringify(novosServicos));
}

function cadastrarCliente() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var endereco = document.getElementById('endereco').value;

    if (nome.trim() === '' || email.trim() === '' || telefone.trim() === '' || endereco.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    salvarClienteLocalStorage(nome, email, telefone, endereco);
    limparCampos();
    carregarClientes();
}

function salvarClienteLocalStorage(nome, email, telefone, endereco) {
    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push({ nome: nome, email: email, telefone: telefone, endereco: endereco });
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('endereco').value = '';
}

function salvarNumeroChamadoLocalStorage(numeroChamado) {
    localStorage.setItem('ultimoNumeroChamado', numeroChamado);
}

function gerarNumero() {
    numeroChamado++;
    var numeroFormatado = "INC" + pad(numeroChamado, 6);
    document.getElementById("chamado").value = numeroFormatado;
    salvarNumeroChamadoLocalStorage(numeroChamado);
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function adicionarServico() {
    var Nchamado = document.getElementById("chamado").value;
    var servico = document.getElementById("servico").value;
    var descricao = document.getElementById("descricao").value;
    var colaborador = document.getElementById("colaborador").value;
    var cliente = document.getElementById("cliente").value;
    var data = document.getElementById("data").value;
    var custo = document.getElementById("custo").value;
    var valorServico = document.getElementById("valor-servico").value;

    if (Nchamado.trim() === '' || servico.trim() === '' || descricao.trim() === '' ||
        colaborador.trim() === '' || cliente.trim() === '' || data.trim() === '' ||
        custo.trim() === '' || valorServico.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    var table = document.getElementById("tabela");
    var tbody = table.getElementsByTagName("tbody")[0];

    var newRow = tbody.insertRow();

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);
    var cell8 = newRow.insertCell(7);
    var cell9 = newRow.insertCell(8);

    cell1.textContent = Nchamado;
    cell2.textContent = servico;
    cell3.textContent = descricao;
    cell4.textContent = colaborador;
    cell5.textContent = cliente;
    cell6.textContent = data;
    cell7.textContent = custo;
    cell8.textContent = valorServico;

    var button = document.createElement('button');
    button.textContent = 'Excluir';
    button.className = 'btn btn-danger';
    button.onclick = function () {
        var row = button.closest('tr');
        row.remove();
        removerServicoLocalStorage(Nchamado);
    };
    cell9.appendChild(button);

    salvarServicosLocalStorage(Nchamado, servico, descricao, colaborador, cliente, data, custo, valorServico);
    limparCamposServico();
}

function limparCamposServico() {
    document.getElementById("servico").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("colaborador").value = "";
    document.getElementById("cliente").value = "";
    document.getElementById("data").value = "";
    document.getElementById("chamado").value = "";
    document.getElementById("custo").value = "";
    document.getElementById("valor-servico").value = "";
}

function carregarColaboradores() {
    var colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
    var selectColaborador = document.getElementById("colaborador");

    selectColaborador.innerHTML = "";

    colaboradores.forEach(function (colaborador) {
        var option = document.createElement("option");
        option.text = colaborador.nome;
        option.value = colaborador.nome;
        selectColaborador.add(option);
    });
}

function carregarClientes() {
    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    var selectCliente = document.getElementById("cliente");

    selectCliente.innerHTML = "";

    clientes.forEach(function (cliente) {
        var option = document.createElement("option");
        option.text = cliente.nome;
        option.value = cliente.nome;
        selectCliente.add(option);
    });
}

function carregarServico() {
    var servicos = JSON.parse(localStorage.getItem('servicos')) || [];

    servicos.forEach(function (element) {
        var table = document.getElementById("tabela");
        var tbody = table.getElementsByTagName("tbody")[0];

        var newRow = tbody.insertRow();

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);
        var cell8 = newRow.insertCell(7);
        var cell9 = newRow.insertCell(8);

        cell1.textContent = element.Nchamado;
        cell2.textContent = element.servico;
        cell3.textContent = element.descricao;
        cell4.textContent = element.colaborador;
        cell5.textContent = element.cliente;
        cell6.textContent = element.data;
        cell7.textContent = element.custo;
        cell8.textContent = element.valorServico;

        var button = document.createElement('button');
        button.textContent = 'Excluir';
        button.className = 'btn btn-danger';
        button.onclick = function () {
            var row = button.closest('tr');
            row.remove();
            removerServicoLocalStorage(element.Nchamado);
        };
        cell9.appendChild(button);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var ultimoNumeroChamado = localStorage.getItem('ultimoNumeroChamado');
    if (ultimoNumeroChamado) {
        numeroChamado = parseInt(ultimoNumeroChamado);
    }
    carregarServico();
    carregarClientes();
    carregarColaboradores();
});

function salvarServicosLocalStorage(Nchamado, servico, descricao, colaborador, cliente, data, custo, valorServico) {
    var servicos = JSON.parse(localStorage.getItem('servicos')) || [];
    servicos.push({
        Nchamado: Nchamado,
        servico: servico,
        descricao: descricao,
        colaborador: colaborador,
        cliente: cliente,
        data: data,
        custo: custo,
        valorServico: valorServico
    });
    localStorage.setItem('servicos', JSON.stringify(servicos));
}

function mostrarCadastrocliente() {
    var form = document.getElementById('Cadastrocliente');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
    carregarClientes();
    carregarColaboradores();
}

function PagColaborador() {
    window.location.href = "cadastroColaborador.html";
}

function ValidarUsuario(event) {
    event.preventDefault();

    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    var colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];

    var colaboradorValido = colaboradores.find(function (colaborador) {
        return (colaborador.email === username || colaborador.nome === username) && colaborador.senha === password;
    });

    if (colaboradorValido) {
        localStorage.setItem('usuarioLogado', JSON.stringify(colaboradorValido));
        alert('Login bem-sucedido. Bem-vindo(a), ' + colaboradorValido.nome + '!');
        window.location.href = "Dashboard.html";
    } else {
        alert('Credenciais inválidas. Por favor, tente novamente.');
    }
}

function redirecionarMenuAutenticado() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuarioLogado) {
        document.getElementById('linkDashboard').href = 'Dashboard.html';
        document.getElementById('linkFinanceiro').href = 'Financeiro.html';
        document.getElementById('linkConta').href = 'Conta.html';
    } else {
        document.getElementById('linkDashboard').href = 'PaginaLogin.html';
        document.getElementById('linkFinanceiro').href = 'PaginaLogin.html';
        document.getElementById('linkConta').href = 'PaginaLogin.html';
    }
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    alert('Você saiu com sucesso.');
    window.location.href = "PaginaLogin.html";
}
