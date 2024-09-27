

const readline =  require('readline')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
    

const menu = {
    '1' : {nome: 'pizza', preço: 90.00},
    '2' : {nome: 'espetinho de carne', preço: 6.50},
    '3' : {nome: 'sopa de batata', preço: 15.00},
    '4' : {nome: 'prato feito', preço: 17.00},
    '5' : {nome: 'pão com ovo', preço: 7.00},
    
}

let pedidos = [];

function mostrarMenu() {
    console.log ('--- Menu do Chefe Leo Restaurant Goumet Gastrônomico 5 star ---');
    for(const key in menu) {
        console.log(`${key}: ${menu[key].nome} - R$ ${menu[key].preço.toFixed(2)}`);
    }
}


function addPedido(item){
    pedidos.push(item)
    console.log(`${menu[item].nome} adicionado ao pedido.`);

}

function calcularTotal(){
    let total = 0;
    pedidos.forEach(item => {
        total+= menu[item].preço;
    })
    console.log(`Total da conta:  R$ ${total.toFixed(2)}`);
}

function fazerPedido() {
    mostrarMenu() 

    rl.question('Escolha um item do menu (digite o numero):', (resposta) => {
        if(menu[resposta]) {
            addPedido(resposta)
            calcularTotal();

            rl.question('Deseje pedir mais alguma coisa? (S/N):', 
            (OutraResposta) => {
                if(OutraResposta.toUpperCase() === 'S') {
                    fazerPedido()
                }else {
                    console.log('Obrigado por pedir!');
                    rl.close()
                }
            })

        }else {
            console.log('Opção inválida, por favor, escolha um item válido do menu.');
            fazerPedido();
        }
    })
}

console.log('Bem vindo ao meu restaurante! ');
fazerPedido()