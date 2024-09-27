const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite um texto: ', (texto) => {
    function contarVogais(texto) {
        const vogais = 'aeiouAEIOU'; 
        let contador = 0; // Corrigido: espaço entre 'let' e 'contador'
        for (let i = 0; i < texto.length; i++) {
            if (vogais.includes(texto[i])) { // Corrigido: 'invludes' para 'includes'
                contador++;
            }
        }
        return contador; // Retornando o contador
    }

    const totalVogais = contarVogais(texto); // Chamando a função
    console.log(`O texto contém ${totalVogais} vogais.`); // Exibindo o resultado
    rl.close(); // Fechando a interface
});