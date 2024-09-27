const readline = require('readline');

// cria uma interface de leitura do input no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const perguntas = [
    {
        pergunta: `
        Qual é o nome do planeta natal do Goku?

        A) Namekusei\n
        B) Terra\n
        C) Vegeta\n
        D) Sadala\n
        E) Vampa\n`,
        resposta: 'c'
    },
    {
        pergunta: `
        Quem foi o primeiro vilão a ser derrotado por Goku na série Dragon Ball Z?

        A) Freeza\n
        B) Raditz\n
        C) Nappa\n
        D) Cell\n
        E) Majin Buu\n`,
        resposta: 'b'
    },
    {
        pergunta: `
        Qual é o nome verdadeiro do Vegeta?

        A) Tarble\n
        B) Vegeta\n
        C) Kakarotto\n
        D) Bardock\n
        E) Raditz\n`,
        resposta: 'b'
    },
    {
        pergunta: `
        Quem matou Freeza pela primeira vez?

        A) Goku\n
        B) Vegeta\n
        C) Trunks\n
        D) Gohan\n
        E) Piccolo\n`,
        resposta: 'c'
    },
    {
        pergunta: `
        Como se chama a fusão entre Goku e Vegeta?

        A) Gogeta\n
        B) Vegito\n
        C) Gotenks\n
        D) Piccolo\n
        E) Vegiku\n`,
        resposta: 'a'
    },
    {
        pergunta: `
        Qual é a transformação mais poderosa de Goku até agora?

        A) Super Saiyajin 3\n
        B) Super Saiyajin Blue\n
        C) Super Saiyajin 4\n
        D) Instinto Superior\n
        E) Super Saiyajin Deus\n`,
        resposta: 'd'
    },
    {
        pergunta: `
        Quem é o criador das Esferas do Dragão na Terra?

        A) Kami-Sama\n
        B) Dende\n
        C) Piccolo\n
        D) Mr. Popo\n
        E) Gohan\n`,
        resposta: 'a'
    },
    {
        pergunta: `
        Qual é o nome do mestre de artes marciais de Goku na infância?

        A) Kami-Sama\n
        B) Mestre Kame\n
        C) Mestre Karin\n
        D) Sr. Popo\n
        E) Sr. Kaio\n`,
        resposta: 'b'
    },
    {
        pergunta: `
        Quantas Esferas do Dragão existem no total?

        A) 5\n
        B) 6\n
        C) 7\n
        D) 8\n
        E) 9\n`,
        resposta: 'c'
    },
    {
        pergunta: `
        Qual é o nome do pai do Goku?

        A) Raditz\n
        B) Bardock\n
        C) Vegeta\n
        D) Nappa\n
        E) Turles\n`,
        resposta: 'b'
    }
];

let pontuacao = 0;
let perguntaAtual = 0;

function fazerPergunta() {
    if (perguntaAtual < perguntas.length) {
        rl.question(perguntas[perguntaAtual].pergunta, (respostaUsuario) => {
            if (respostaUsuario.toLowerCase() === perguntas[perguntaAtual].resposta) {
                console.log(`Resposta correta! Parabéns!`);
                pontuacao++;
            } else {
                console.log(`Resposta incorreta! O correto era: ${perguntas[perguntaAtual].resposta}`);
            }

            perguntaAtual++;
            fazerPergunta();
        });
    } else {
        console.log(`Fim do quiz! Seus pontos: ${pontuacao}/${perguntas.length}`);

        if (pontuacao <= 5) {
            console.log(`Yamcha`);
        } else if (pontuacao <= 9) {
            console.log(`Piccolo`);
        } else {
            console.log(`Goku (Instinto Superior)`);
        }

        rl.close();
    }
}

console.log('BEM-VINDO(A) AO QUIZ DE DRAGON BALL!');
fazerPergunta();