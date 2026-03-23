let filaNormal = [];
let filaPreferencial = [];
let contadorPreferenciais = 0; // Para não travar a fila comum

function cadastrar() {
    const nome = document.getElementById('nome').value.trim();
    const idadeInput = document.getElementById('idade').value;
    const cpfRaw = document.getElementById('cpf').value.trim();
    const telefoneRaw = document.getElementById('telefone').value.trim();
    let isPreferencial = document.getElementById('isPreferencial').checked;

    const idade = parseInt(idadeInput);

    // Validações básicas
    if (!nome || isNaN(idade) || !cpfRaw) {
        alert("⚠️ Nome, Idade e CPF são obrigatórios.");
        return;
    }

    if (idade < 0 || idade > 120) {
        alert("⚠️ Digite uma idade válida.");
        return;
    }

    // Limpeza de caracteres não numéricos
    const cpf = cpfRaw.replace(/\D/g, "");
    const telefone = telefoneRaw.replace(/\D/g, "") || "Não informado";

    // Regra de negócio: Idade >= 60 é automaticamente preferencial
    if (idade >= 60) isPreferencial = true;

    const novoPaciente = {
        nome: nome,
        idade: idade,
        cpf: cpf,
        telefone: telefone,
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    if (isPreferencial) {
        filaPreferencial.push(novoPaciente);
        console.log(`Preferencial: ${nome} adicionado.`);
    } else {
        filaNormal.push(novoPaciente);
        console.log(`Normal: ${nome} adicionado.`);
    }

    alert(`✅ ${nome} cadastrado com sucesso!`);
    limparCampos();
}

function chamarProximo() {
    let pacienteChamado = null;
    let tipo = "";

    // Lógica: Se houver preferencial e (ainda não chamamos 2 seguidos ou a fila comum está vazia)
    if (filaPreferencial.length > 0 && (contadorPreferenciais < 2 || filaNormal.length === 0)) {
        pacienteChamado = filaPreferencial.shift();
        tipo = "PREFERENCIAL";
        contadorPreferenciais++;
    } 
    // Caso contrário, chama a fila normal se não estiver vazia
    else if (filaNormal.length > 0) {
        pacienteChamado = filaNormal.shift();
        tipo = "CONVENCIONAL";
        contadorPreferenciais = 0; // Reseta o ciclo de preferência
    } 
    // Se a normal estava vazia mas ainda tinha gente na preferencial (ex: contador já estava em 2)
    else if (filaPreferencial.length > 0) {
        pacienteChamado = filaPreferencial.shift();
        tipo = "PREFERENCIAL";
    }
    else {
        alert("ℹ️ Não há pacientes nas filas.");
        return;
    }

    exibirChamada(pacienteChamado, tipo);
}

function exibirChamada(paciente, tipo) {
    const painel = document.getElementById('painelChamada');
    
    // Atualiza o HTML em vez de apenas dar alert
    painel.innerHTML = `
        <div class="card-chamada ${tipo.toLowerCase()}">
            <small>ATENDIMENTO ${tipo}</small>
            <h1>${paciente.nome.toUpperCase()}</h1>
            <p>CPF: ***.${paciente.cpf.substring(3,6)}.***-**</p>
            <p class="hora">Chegada: ${paciente.hora}</p>
        </div>
    `;

    // Som de alerta (opcional, mas imersivo)
    const msg = new SpeechSynthesisUtterance(`Próximo paciente: ${paciente.nome}. Fila ${tipo}`);
    window.speechSynthesis.speak(msg);
}

function limparCampos() {
    document.getElementById('nome').value = "";
    document.getElementById('idade').value = "";
    document.getElementById('cpf').value = "";
    document.getElementById('telefone').value = "";
    document.getElementById('isPreferencial').checked = false;
}