const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Digite um número para ver a tabuada de multiplicação: ', (numero) => {
    numero = parseInt(numero);

    console.log(`Tabuada de multiplicação de ${numero}:`);

    for (let i = 1; i <= 10; i++) {
        let resultado = numero * i;
        console.log(`${numero} x ${i} = ${resultado}`);
    }

    rl.close();
});