const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


function soma(x, y){
    return x + y;
}

function subtrair(x, y){
    return x - y;
}

function multiplicar(x, y){
    return x * y;
}

function divisao(x, y){
    if (y !== 0) {
        return x / y;
    } else {
        return 'impossible dumb'
    }
}

function main(){
    console.log('1. Adição');
    console.log('2. Subtração');
    console.log('3. Multiplicação');
    console.log('4. Divisão');

    rl.question('Digite o número da opção desejada: ', (escolha) => {
        if(['1', '2', '3', '4'].includes(escolha)) {
            rl.question('Digite o primeiro número: ', (x) => {
                rl.question('Digite o segundo número: ', (y) =>{
                    x = parseFloat(x);
                    y = parseFloat(y);

                    let resultado;

                    switch(escolha){
                        case '1': resultado = soma(x, y);
                        console.log(`${x} + ${y} = ${resultado}`);
                        break;

                        case '2': resultado = subtrair(x, y);
                        console.log(`${x} - ${y} = ${resultado}`);
                        break;

                        case '3': resultado = multiplicar(x, y);
                        console.log(`${x} * ${y} = ${resultado}`);
                        break;

                        case '4': resultado = divisao(x, y);
                        console.log(`${x} / ${y} = ${resultado}`);
                        break;

                    }

                    rl.close();
                })
            })
        }
    })
}

main();