const readline = require('readline'); // ler no terminal
const fs = require('fs');             // file system, criar arquivos novos
const crypto = require('crypto')      // criptografa a senha do user

const rl = readline.createInterface({
    //define o processo de leitura e saida de dados do termianal
    input: process.stdin,
    output: process.stdout
})

const criptografar = (senha) => {
    if(!senha) {
        throw new Error('Senha não pode ser vazia');
    }
    const hash = crypto.createHash('sha256');
    hash.update(senha);
    return hash.digest('hex');
}

const validacaoUsername = (username) => /^[A-Za-z]{5,12}$/.test(username);
const validacaoSenha = (senha) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/.test(senha);
const validacaoEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Valida formato de e-mail

const carregarUsuarios = () => {
    try{
        if (fs.existsSync('users.json')) {
            const dados = fs.readFileSync('users.json', 'utf8');
            return dados ? JSON.parse(dados) : {};
        }
        return {};
    } catch (erro) {
        console.log('erro ao ler o arquivo: ', erro);
        return {};
    }
};

salvarUsuarios = (usuarios) => {
    try{
        fs.writeFileSync('users.json', JSON.stringify(usuarios, null, 2));
    } catch (erro) {
        console.log('erro ao salvar o arquivo: ', erro);
    }
};

const salvarUser = (username, senha, email) => {
    const users = carregarUsuarios();
    if (users[username]) {
        console.log('nome de usuarios já está em uso. Escolha outro nome.');
        return false;
    }

    users[username] = {senha: criptografar(senha), email };
    salvarUsuarios(users);
    return true;
};

const checarUser = (username, senha) => {
    const users = carregarUsuarios();
    return users[username] && users[username].senha === criptografar(senha);
};

const formatacaoTempo = (parametro) => {
    const dias = Math.floor(parametro / (1000 * 60 * 60* 24));
    const horas = Math.floor((parametro % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((parametro % (1000 * 60 * 60)) / (1000 * 60));

    //funcao auxiliar para retornar o singular ou plural correto
    const pluralize = (value, singular, plural) => value === 1 ? singular : plural;

    //construa a string apenas se o valor for mais que zero
    let resultado = '';
    if (dias > 0) {
        resultado += `${dias} ${pluralize(dias, 'dia', 'dias')}`;
    }
    if (horas > 0 || dias > 0) {
        if (resultado) resultado += ', ';
        resultado += `${horas} ${pluralize(horas, 'hora', 'horas')}`;
    }
    if (minutos > 0 || horas > 0 || dias > 0) {
        if (resultado) resultado += ', ';
        resultado += `${minutos} ${pluralize(minutos, 'minuto', 'minutos')}`;
    }

    //se nenhum tempo relevante, coloque 0 minutos
    return resultado || '0 minutos';
};

const visualizarAgendamento = (username) => {
    const agendamento = carregarAgendamentos();
    
    const usuariosAgendados = Object.entries(agendamento).filter(([id, app]) => app.username === username);
    if (usuariosAgendados.length === 0) {
        console.log('Você não tem compromissos agendados.');
        mostrarOpcoes(username);
    } else {
        console.log('Seus compromissos agendados: ');
        usuariosAgendados.forEach(([id, app], index) => {
            const status = verificarAtraso(app.dataHora);
            console.log(`${index + 1}. Local: ${app.local}, Data e Hora: ${app.dataHora} - ${status}`);
        });

        rl.question('Deseja (1) voltar, (2) editar um agendamento ou (3) deletar um agendamento? ', (escolha) => {
            if (escolha === '1') {
                mostrarOpcoes(username);
            } else if (escolha === '2') {
                editarAgendamento(username, usuariosAgendados);
            } else if (escolha === '3') {
                rl.question('Digite o número de agendamento que deseja deletar: ', (numero) => {
                    const index = parseInt(numero) - 1;
                    if (index >= 0 && index < usuariosAgendados.length) {
                        deletarAgendamento(username, usuariosAgendados[index][0]);
                    } else {
                        console.log('Número inválido.');
                        visualizarAgendamento(username);
                    }
                });
            } else {
                console.log('Escolha inválida.');
                visualizarAgendamento(username);
            }
        });
    }
};

 const salvarAgendamentos = (agendamentos) => {
    try {
        fs.writeFileSync('agendamentos.json', JSON.stringify(agendamentos, null, 2), 'utf8');
        console.log('Arquivo de agendamentos salvo com sucesso!');
    } catch (err) {
        console.error('Erro ao salvar o arquivo de agendamentos', err);
    }
};

const carregarAgendamentos = () => {
    try {
        if (fs.existsSync('agendamentos.json')) {
            const dados = fs.readFileSync('agendamentos.json', 'utf8');
            return dados ? JSON.parse(dados) : {};
        }
        return {};
    } catch (erro) {
        console.log('Erro ao ler o arquivo de agendamentos: ', erro);
        return {};
    }
};

const editarAgendamento = (username, usuariosAgendados) => {
    console.log('Seus compromissos agendados: ');
    usuariosAgendados.forEach(([id, app], index) => {
        console.log(`${index + 1}. Local: ${app.local}, Data e Hora: ${app.dataHora}`);
    });

    rl.question('Digite o número do agendamento que deseja editar: ', (numero) => {
        const index = parseInt(numero) - 1;
        if (index >= 0 && index < usuariosAgendados.length) {
            const [id, app] = usuariosAgendados[index];

            // Verificar se o agendamento pertence ao usuário logado
            if (app.username !== username) {
                console.log('Você não tem permissão para editar este agendamento.');
                visualizarAgendamento(username); // Volta para a visualização dos agendamentos
                return;
            }

            rl.question('Você quer editar a data ou o conteúdo? (Digite "data" ou "conteúdo")', (tipo) => {
                if (tipo === 'data') {
                    rl.question('Digite a nova data (DD/MM/AAAA HH:MM): ', (novaData) => {
                        app.dataHora = novaData;
                        const agendamentos = carregarAgendamentos();
                        agendamentos[id] = app; // Atualiza o agendamento no arquivo
                        salvarAgendamentos(agendamentos);
                        console.log('Data atualizada com sucesso!');
                        visualizarAgendamento(username);
                    });
                } else if (tipo === 'conteúdo') {
                    rl.question('Digite o novo conteúdo: ', (novoConteudo) => {
                        app.local = novoConteudo;
                        const agendamentos = carregarAgendamentos();
                        agendamentos[id] = app; // Atualiza o agendamento no arquivo
                        salvarAgendamentos(agendamentos);
                        console.log('Conteúdo atualizado com sucesso!');
                        visualizarAgendamento(username);
                    });
                } else {
                    console.log('Escolha inválida!');
                    editarAgendamento(username, usuariosAgendados);
                }
            });
        } else {
            console.log('Número inválido.');
            editarAgendamento(username, usuariosAgendados);
        }
    });
};

const deletarAgendamento = (username, id) => {
    let agendamentos = carregarAgendamentos()
    delete agendamentos[id];

    try {
        salvarAgendamentos(agendamentos);
        console.log('Compromisso deletado com sucesso');
    } catch (writeErro) {
        console.log('Erro ao salvar o arquivo:', writeErro.message);
    }

    mostrarOpcoes(username);
}

const marcarAgendamento = (username) => {
    rl.question('Digite o local do compromisso (dentista, biblioteca, lanchonete, cursos, academia, etc.): ', (local) => {
        rl.question('digite a data e a  hora do compromisso (DD/MM/AA HH:MM): ', (dataH) => {
            const horaConvertida = dataHora(dataH);

            if(isNaN(horaConvertida.getTime())) {
                console.log('formato de data e hora invalido. use DD/MM/AA HH:MM');
                //reinicia a funçao de marcaçao de agendamento sem causar recursao infinita
                marcarAgendamento(username)
                return;
            }
            
            const agendar = {
                username,
                local,
                dataHora: formatarData(horaConvertida),
                tipo: 'compromisso'
            };

            let agendamentos = {};
            try {
                //verifica se o arquivo existe e é legivel
                if (fs.existsSync('agendamentos.json')){
                    const dados = fs.readFileSync('agendamentos.json',  'utf8');
                    //verifica se os dados lidos nao estao vazios e sao validos
                    if (dados.trim()) {
                        try {
                            agendamentos = JSON.parse(dados);
                        } catch (parseErro) {
                            console.log('Erro ao analisar o arquivo JSON', parseErro.message);
                            return; //encerra a funçao se houver erro de analise
                        }
                    }
                }
            } catch(erro) {
                //trata o erro caso o arquivo JS0N nao seja acessivel
                console.log('erro ao ler o arquivo: ', erro.message);
                return; //encerra a funçao se houver erro
            }

            const id = Date.now().toString();
            agendamentos[id] = agendar;

            try{ 
                fs.writeFileSync('agendamentos.json', JSON.stringify(agendamentos, null, 2));
                console.log('compromisso agendado com sucesso!');
            } catch (writeErro) {
                console.log('Erro ao salvar o arquivo:', writeErro.message);
            }

            mostrarOpcoes(username); // volta ao menu de opçoes apos o agendamento
        });
    });
};

const formatarData = (date) => {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); //meses começando em 0
    const ano = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2,'0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`
}

const dataHora = (input) => {
    const [data, tempo] = input.split(' ');
    if(!tempo) {
        return new Date(NaN) // retorna data invalida se o formato tiver incorreto
    }

    const [ dia, mes, ano ] = data.split('/').map(Number);
    const [ horas, minutos ] = tempo.split(':').map(Number);
    return new Date(ano, mes - 1, dia, horas, minutos); //ajusta o mes
};

//funçao para verificar se um compromisso esta atrasaso
const verificarAtraso = (dataHoraCompromisso) => {
    const agora = new Date();
    const [dia, mes, ano, hora, minuto] = dataHoraCompromisso.split(/\/|\s|:/).map(Number);
    const dataCompromisso = new Date(ano, mes - 1, dia, hora, minuto);

    const tempoRestante = dataCompromisso - agora;

    if(tempoRestante < 0){
        return 'voce esta atrasado.';
    }else {
        return `faltam ${formatacaoTempo(tempoRestante)} para seu compromisso.`;
    }
};

const mostrarOpcoes = (username) => {
    rl.question('O que vc deseja fazer? (1) agendar um compromisso (2) Verificar compromisso (3) Sair: ', (escolha) => {
        if(escolha === '1'){
            marcarAgendamento(username);
        } else if (escolha === '2') {
            visualizarAgendamento(username)
        } else if (escolha === '3') {
            console.log('Saindo...');
            rl.close()
        }else {
            console.log('Escolha invalida!');
            mostrarOpcoes(username)
        }
    });
};

const registro = () => {
    rl.question('digite seu nome de usuario: ', (username) => {
        if (!validacaoUsername(username)) {
            console.log('Nome de usuario invalido. Deve conter apenas letras (A-Z, a-z) e ter de 5 a 12 caracteres.');
            registro();
            return;
        }

        rl.question('Digite seu email: ', (email) => {
            if(!validacaoEmail(email)) {
                console.log('Email invalido. Tente novamente.');
                registro();
                return;
            };

        rl.question('Digite sua senha: ', (senha) => {
            if(!validacaoSenha(senha)) {
                console.log('Senha invalida. deve conter de 6 a 12 caracteres, incluindo letras maiusculas, minusculas, numeros e simbolos.');
                registro();
                return;
            };

            if (salvarUser(username, senha, email)) { //verifica se o usuario foi registrado com sucesso
                console.log('usuario registrado com sucesso!');
            } else {
                registro(); //se o usuario ja existe, tente registrar novamente
            }
            mostrarOpcoes(username); //volta ao menu principal apos registrar o user
        });
      });
  });
};

const recuperarSenhha = () => {
    rl.question('Digite seu nome de usuario: ', (username) => {
        rl.question('digite seu e-mail: ', (email) => {
            const users = carregarUsuarios();
            if (users[username] && users[username].email === email) {
                rl.question('digite sua nova senha: ', (novaSenha) => {
                    if (!validacaoSenha(novaSenha)) {
                        console.log('senha invalida. Deve conter de 6 a 12 caracteres, incluindo letras maiusculas, minusculas, numeros e símbolos.');
                        recuperarSenhha();
                        return;
                    }
                    users[username].senha = criptografar(novaSenha);
                    salvarUsuarios(users);
                    console.log('Senha alterada com sucesso!');
                    mostrarMenu();
                });
            } else {
                console.log('nome de usuario ou e-mail não encontrado!');
                mostrarMenu();
            }
        });
    });
};

const promptLogin = () => {
    rl.question('Digite seu nome de usuario: ', (username) => {
        rl.question('digite sua senha: ', (senha) => {
            if (checarUser(username, senha)) {
                console.log('login bem-sucedido!');
                visualizarAgendamento(username); // mostra as opçoes p user apos o login
            } else {
                console.log('Nome de usuario ou senha incorretos!');
                promptLogin(); // se estiver errado volta pro outro menu
            };
        });
    });
};

const mostrarMenu = () => {
    console.log('\n===== Menu Principal =====');
    console.log('1. Registrar-se');
    console.log('2. Fazer login');
    console.log('3. Recuperar senha');
    console.log('4. Sair\n');

    rl.question('escolha uma opção: ', (option) => {
      switch (option) {
        case '1':
            registro(); //chama a funão registro
            break;
        case '2':
            promptLogin(); //chama a função de login
            break;
        case '3':
            recuperarSenhha(); //chama a função recuperar senha
            break;
        case '4':
            rl.close(); //encerra o programa
            break;
        default:
            console.log('Opçao invalida. tente novamente.');
            mostrarMenu(); // reexibe o menu principal
      }
    });
};

mostrarMenu();