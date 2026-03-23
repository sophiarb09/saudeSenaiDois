let filaNormal = [];
let filaPreferencial = [];

function cadastrar() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const isPreferencial = document.getElementById('isPreferencial').checked;

    if (!nome || !idade || !cpf) {
        alert("Por favor, preencha os campos obrigatórios (Nome, Idade e CPF).");
        return;
    }

    const novoPaciente = {
        nome: nome,
        idade: idade,
        cpf: cpf,
        telefone: telefone
    };

    if (isPreferencial) {
        filaPreferencial.push(novoPaciente);
        alert(`Paciente PREFERENCIAL ${nome} cadastrado com sucesso!`);
    } else {
        filaNormal.push(novoPaciente);
        alert(`Paciente ${nome} cadastrado na fila comum.`);
    }

    limparCampos();
}

function chamarProximo() {
    let pacienteChamado;

    if (filaPreferencial.length > 0) {
        pacienteChamado = filaPreferencial.shift();
        exibirChamada(pacienteChamado, "PREFERENCIAL");
    } 

    else if (filaNormal.length > 0) {
        pacienteChamado = filaNormal.shift();
        exibirChamada(pacienteChamado, "NORMAL");
    } 

    else {
        alert("Não há pacientes aguardando na fila.");
    }
}

function exibirChamada(paciente, tipo) {
    alert(`
        PRÓXIMO PACIENTE:
        -------------------------
        Nome: ${paciente.nome}
        Tipo: ${tipo}
        CPF: ${paciente.cpf}
        -------------------------
        Favor dirigir-se ao guichê de atendimento.
    `);
}

function limparCampos() {
    document.getElementById('nome').value = "";
    document.getElementById('idade').value = "";
    document.getElementById('cpf').value = "";
    document.getElementById('telefone').value = "";
    document.getElementById('isPreferencial').checked = false;
}