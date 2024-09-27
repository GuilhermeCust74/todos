const fs = require('fs')
// fs significa 'file system', e um modulo do js quw
fs.readFile('texto.txt', 'utf8',(erro,
     data) => {
        if(erro){
            console.log(erro);
            return
        }

        console.log(data);
     })

const conteudo =
'Texto para ser sobreescrito no arquivo'

fs.writeFile('texto.txt', conteudo, 'utf8', (erro) =>
{
    if(erro){
        console.log(erro);
        return
    }

    console.log('Arquivo foi sobreescrito com sucesso!');
})

// criar arquivos

const novaPasta = 'novaPasta';

if(!fs.existsSync(novaPasta)){

    fs.mkdir(novaPasta, (erro) =>{
        if(erro){
            console.log(erro);
            return
        }

        console.log('pasta criada com sucesso!');
    });

}else{
    console.log('a pasta ja existe!');
}

//listar arquivos (read = ler, dir = diretorio)
fs.readdir('.', (erro, arquivos) => {
    if(erro) {
        console.log(erro);
        return;
    }

    console.log('Arquivos na pasta atual: ', arquivos)
})


//renomear
const arquivoParaRenomear = 'nomeAntigo.txt' ;
const novoNone = 'novoNome.txt' ;

if (fs.existsSync(arquivoParaRenomear)) {
    fs.rename(arquivoParaRenomear, novoNone, (erro) => {
        if(erro){
            console.log(erro);
            return;
        }

        console.log('Arquivo renomeado com sucesso!');
    });
} else {
    console.log('O arquivo a ser renomeado nao existe!');
}

// excluir
const arquivoParaExcluir = 'texto.txt';

if(fs.existsSync(arquivoParaExcluir)){
    fs.unlink(arquivoParaExcluir, (erro) =>{
        if(erro){
        console.log(erro);
        return;
       
      }
      console.log(' Arquio excluido com sucesso!');
    });
} else {
    console.log('O arquivo a ser excluido nao existe!');
}
 
//exer

const origem = 'origem6.txt';
const destino = 'destino7.txt';

fs.copyFile(origem, destino, (erro) => {
    if(erro) {
        consol.log(erro);
        return;
    }
    console.log('arquivo copiado');
});

const texto = 'miguel gay'

fs.appendFile(origem, texto, 'utf8', (erro) => {
    if(erro){
        console.log(erro);
        return;
    }
    console.log('arquivo add com sucesso')
});

const monitorar = 'origem.txt';


    fs.watch(monitorar, (arquivo) => {
        if(arquivo){
            
            console.log(`${arquivo} foi modificado!`);
        }
    });