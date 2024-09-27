const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('digite uma mensagem para criptografar:', (mensagem) => {
    let mensagemCriptografada = '';

    for(let i = 0; i < mensagem.length; i++){
        let char = mensagem[i]

        if (char >= 'a' && char <= 'z'){
            char = String.fromCharCode((char.charCodeAt(0) - 97 - 3) % 26 + 97)
        }

        mensagemCriptografada += char;
    }

    console.log('mensagem criptografada: ', mensagemCriptografada);
    rl.close()
})