const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const nomes = [
    'Ana', 'Ber', 'Calebe', 'Duda', 'Gabriel', 'Bibi', 'Gigi', 'Guilherme',
    'Nemo', 'Isadora', 'Jhenny', 'Jhones', 'Laurão', 'Lolo', 'Miguel',
    'Nady', 'Sasah', 'Vitoria'
];

function roletaRussa() {
  
    rl.question('Você quer girar o tambor? (sim/não): ', (resposta) => {
        if (resposta.toLowerCase() === 'sim') {
            console.log('O tambor está girando...');
        } else {
            console.log('Você decidiu não girar o tambor.');
        }
    
        rl.question('Aponte a arma e aperte o gatilho (aperte Enter para disparar): ', () => {
      
            const nome = nomes[Math.floor(Math.random() * nomes.length)];

        
            const resultado = Math.random() < 0.5 ? 'morreu' : 'vive';

            console.log(`${nome}  ${resultado}.`);

            rl.close();
        });
    });
}

roletaRussa();