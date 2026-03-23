let filaNormal = [];
let filaPreferencial = [];

function cadastrar() {
    const nome = document.getElementById('nome').value.trim();
    const idadeInput = document.getElementById('idade').value;
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    let isPreferencial = document.getElementById('isPreferencial').checked;

    const idade = parseInt(idadeInput);

    if (!nome || isNaN(idade) || !cpf) {
        alert("Erro: Nome, Idade e CPF são obrigatórios.");
        return;
    }

    if (idade < 0 || idade > 120) {
        alert("Erro: Por favor, digite uma idade válida (0 a 120).");
        return;
    }

    if (!/^\d+$/.test(cpf.replace(/[\.\-]/g, ""))) {
        alert("Erro: O CPF deve conter apenas números.");
        return;
    }

    if (telefone && !/^\d+$/.test(telefone.replace(/[\(\)\-\s]/g, ""))) {
        alert("Erro: O Telefone deve conter apenas números.");
        return;
    }

    if (idade >= 60) {
        isPreferencial = true;
    }

    const novoPaciente = {
        nome: nome,
        idade: idade,
        cpf: cpf,
        telefone: telefone || "Não informado",
        dataCadastro: new Date().toLocaleTimeString()
    };

    if (isPreferencial) {
        filaPreferencial.push(novoPaciente);
        alert(`Paciente PREFERENCIAL ${nome} cadastrado!`);
    } else {
        filaNormal.push(novoPaciente);
        alert(`Paciente ${nome} cadastrado na fila comum.`);
    }

    limparCampos();
}

function chamarProximo() {
    let pacienteChamado;
    let tipo;

    if (filaPreferencial.length > 0) {
        pacienteChamado = filaPreferencial.shift();
        tipo = "PREFERENCIAL";
    } else if (filaNormal.length > 0) {
        pacienteChamado = filaNormal.shift();
        tipo = "NORMAL";
    } else {
        alert("Não há pacientes aguardando na fila.");
        return;
    }

    exibirChamada(pacienteChamado, tipo);
}

function exibirChamada(paciente, tipo) {
    alert(`
        >>> PRÓXIMO ATENDIMENTO <<<
        -------------------------
        TIPO: ${tipo}
        NOME: ${paciente.nome.toUpperCase()}
        IDADE: ${paciente.idade} anos
        CPF: ${paciente.cpf}
        -------------------------
        Favor dirigir-se ao guichê.
    `);
}

function limparCampos() {
    document.getElementById('nome').value = "";
    document.getElementById('idade').value = "";
    document.getElementById('cpf').value = "";
    document.getElementById('telefone').value = "";
    document.getElementById('isPreferencial').checked = false;
}