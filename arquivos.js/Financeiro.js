var numeroChamado = 0;
var ganhosPorMes = {};
var ganhosPorAno = {};

function carregarServico() {
    var servicos = JSON.parse(localStorage.getItem('servicos')) || [];

    var table = document.getElementById("tabela");
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // Limpa o conteúdo atual da tabela

    var soma = 0;

    servicos.forEach(servico => {
        var newRow = tbody.insertRow();
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);

        cell1.textContent = servico.Nchamado;
        cell2.textContent = servico.data;
        cell3.textContent = servico.descricao;; // Alterado aqui

        // Busca os valores de custo e valor do serviço diretamente dos inputs
        var custo = parseFloat(servico.custo);
        var valorServico = parseFloat(servico.valorServico);

        cell4.textContent = custo.toFixed(2);
        cell5.textContent = valorServico.toFixed(2);

        var ganho = valorServico - custo;
        cell6.textContent = ganho.toFixed(2);
        soma += ganho;

        // Atualizar ganhos por período
        atualizarGanhos(servico.data, ganho);
    });

    document.getElementById("div2").innerHTML = "TOTAL: " + soma.toFixed(2);

    // Atualiza os gráficos
    atualizarGrafico();
}

function atualizarGanhos(data, ganho) {
    var date = new Date(data);
    var mes = date.getFullYear() + "-" + (date.getMonth() + 1);
    var ano = date.getFullYear().toString();

    // Atualiza ganhos mensais
    ganhosPorMes[mes] = (ganhosPorMes[mes] || 0) + ganho;

    // Atualiza ganhos anuais
    ganhosPorAno[ano] = (ganhosPorAno[ano] || 0) + ganho;
}

function atualizarGrafico() {
    var ctx = document.getElementById('graficoGanhos').getContext('2d');
    var labels = Object.keys(ganhosPorMes);
    var data = Object.values(ganhosPorMes);
    if (window.grafico) {
        window.grafico.data.labels = labels;
        window.grafico.data.datasets[0].data = data;
        window.grafico.update();
    } else {
        window.grafico = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Ganhos Mensais',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo branco
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#cccccc'
                        },
                        ticks: {
                            color: '#000000'
                        }
                    },
                    x: {
                        grid: {
                            color: '#cccccc'
                        },
                        ticks: {
                            color: '#000000'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#000000'
                        }
                    }
                }
            }
        });
    }
}

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

function resetarGanhos() {
    ganhosPorMes = {};
    ganhosPorAno = {};

    var servicos = JSON.parse(localStorage.getItem('servicos')) || [];
    servicos.forEach(servico => {
        atualizarGanhos(servico.data, parseFloat(servico.ganho));
    });

    atualizarGrafico();
}

document.addEventListener("DOMContentLoaded", function () {
    numeroChamado = localStorage.getItem('ultimoNumeroChamado') ? parseInt(localStorage.getItem('ultimoNumeroChamado')) : 0;
    carregarServico();
    resetarGanhos();
});

// Agendar resets automáticos
setInterval(resetarGanhos, 24 * 60 * 60 * 1000); // Reset diário

function logout() {
    localStorage.removeItem('usuarioLogado');
    alert('Você saiu com sucesso.');
    window.location.href = "PaginaLogin.html";
}
