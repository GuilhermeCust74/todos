const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let saldo = 0;

function consultarSaldo() {
    console.log(`\nSeu saldo atual é R$ ${saldo.toFixed(2)}`);
    menuOperacoes();
}

function fazerDeposito(valor) {
    if (valor <= 0) {
        console.log("Valor do depósito inválido. Insira um valor positivo.");
    } else {
        saldo += valor;
        console.log(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso.`);
    }
    menuOperacoes();
}

function fazerSaque(valor) {
    if (valor <= 0) {
        console.log("Valor do saque inválido. Insira um valor positivo.");
    } else if (valor > saldo) {
        console.log("Saldo insuficiente para o saque.");
    } else {
        saldo -= valor;
        console.log(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso.`);
    }
    menuOperacoes();
}

function menuOperacoes() {
    console.log('\nEscolha uma opção:');
    console.log('1 - Consultar Saldo');
    console.log('2 - Fazer Depósito');
    console.log('3 - Fazer Saque');
    console.log('4 - Sair');

    rl.question('Digite o número da opção desejada: ', (opcao) => {
        switch (opcao) {
            case '1':
                consultarSaldo();
                break;
            case '2':
                rl.question('Digite o valor do depósito (R$): ', (valor) => {
                    const valorDeposito = parseFloat(valor);
                    if (isNaN(valorDeposito)) {
                        console.log("Entrada inválida. Por favor, insira um número válido.");
                        menuOperacoes();
                    } else {
                        fazerDeposito(valorDeposito);
                    }
                });
                break;
            case '3':
                rl.question('Digite o valor do saque (R$): ', (valor) => {
                    const valorSaque = parseFloat(valor);
                    if (isNaN(valorSaque)) {
                        console.log("Entrada inválida. Por favor, insira um número válido.");
                        menuOperacoes();
                    } else {
                        fazerSaque(valorSaque);
                    }
                });
                break;
            case '4':
                console.log('Saindo...');
                rl.close();
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                menuOperacoes();
                break;
        }
    });
}

// Inicia o menu de operações
menuOperacoes();