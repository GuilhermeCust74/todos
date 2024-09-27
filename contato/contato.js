const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const contatos = [];

function addContato() {
    rl.question('Digite o nome do contato: ', (nome) => {
        rl.question('Digite o telefone do contato: ', (telefone) => {
            rl.question('Digite o email do contato: ', (email) => {
                const novoContato = {
                    nome: nome,
                    telefone: telefone,
                    email: email,
                };

                contatos.push(novoContato);
                console.log('Contato adicionado com sucesso!');
                menu();
            });
        });
    });
}

function mostrarContato() {
    console.log('Lista de contatos:');
    contatos.forEach((contato, index) => {
        console.log(` ${index + 1}) Nome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email}`);
    });

    menu();
}

function menu() {
    console.log(`Menu:
    1. Adicionar Novo Contato
    2. Ver Contatos
    3. Sair`);

    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                addContato();
                break;

            case '2':
                mostrarContato();
                break;

            case '3':
                console.log('Saindo do gerenciador de contatos! Até mais 😁');
                rl.close();
                break;

            default:
                console.log('Opção inválida! Tente novamente.');
                menu();
                break;
        }
    });
}

console.log('Bem-vindo ao gerenciador de contatos!');
menu(); 