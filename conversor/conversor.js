const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Escolha a conversão desejada:\n1. Temperatura\n2. Tempo\n3. Distância\nDigite o número da opção: ', (opcao) => {
    if (opcao === '1') {
        rl.question('Escolha uma unidade da temperatura para converter (C para Celsius, F para Fahrenheit): ', (unidade) => {
            rl.question('Digite o valor da temperatura a ser convertida: ', (valor) => {
                valor = parseFloat(valor);
                if (unidade.toLowerCase() === 'c') {
                    // Conversão de Celsius para Fahrenheit
                    let resultado = (valor * 9/5) + 32;
                    console.log(`${valor}°C é igual a ${resultado.toFixed(2)}°F`);
                } else if (unidade.toLowerCase() === 'f') {
                    // Conversão de Fahrenheit para Celsius
                    let resultado = (valor - 32) * 5/9;
                    console.log(`${valor}°F é igual a ${resultado.toFixed(2)}°C`);
                } else {
                    console.log('Unidade inválida. Use C para Celsius ou F para Fahrenheit.');
                }
                rl.close();
            });
        });
    } else if (opcao === '2') {
        rl.question('Escolha uma unidade de tempo para converter (s para segundos, m para minutos, h para horas): ', (unidade) => {
            rl.question('Digite o valor do tempo a ser convertido: ', (valor) => {
                valor = parseFloat(valor);
                if (unidade.toLowerCase() === 's') {
                    // Conversão de segundos para minutos e horas
                    let minutos = valor / 60;
                    let horas = valor / 3600;
                    console.log(`${valor} segundos é igual a ${minutos} minutos e ${horas} horas.`);
                } else if (unidade.toLowerCase() === 'm') {
                    // Conversão de minutos para segundos e horas
                    let segundos = valor * 60;
                    let horas = valor / 60;
                    console.log(`${valor} minutos é igual a ${segundos} segundos e ${horas} horas.`);
                } else if (unidade.toLowerCase() === 'h') {
                    // Conversão de horas para segundos e minutos
                    let segundos = valor * 3600;
                    let minutos = valor * 60;
                    console.log(`${valor} horas é igual a ${segundos} segundos e ${minutos} minutos.`);
                } else {
                    console.log('Unidade inválida. Use s para segundos, m para minutos ou h para horas.');
                }
                rl.close();
            });
        });
    } else if (opcao === '3') {
        rl.question('Escolha uma unidade de distância para converter (km para quilômetros, mi para milhas): ', (unidade) => {
            rl.question('Digite o valor da distância a ser convertida: ', (valor) => {
                valor = parseFloat(valor);
                if (unidade.toLowerCase() === 'km') {
                    // Conversão de quilômetros para milhas
                    let resultado = valor * 0.621371;
                    console.log(`${valor} km é igual a ${resultado} milhas.`);
                } else if (unidade.toLowerCase() === 'mi') {
                    // Conversão de milhas para quilômetros
                    let resultado = valor / 0.621371;
                    console.log(`${valor} milhas é igual a ${resultado} km.`);
                } else {
                    console.log('Unidade inválida. Use km para quilômetros ou mi para milhas.');
                }
                rl.close();
            });
        });
    } else {
        console.log('Opção inválida. Escolha 1 para Temperatura, 2 para Tempo ou 3 para Distância.');
        rl.close();
    }
});