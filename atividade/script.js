const dizQueEhEstudante = {
    nome: 'Gigi',
    idade: 16,
    anoEscolar: '2º',
    materias: {
      filosofia: 60,
      biologia: 55,
      scratch: 0
    }
  };
  
 
  const { nome, idade, materias: { biologia, filosofia } } = dizQueEhEstudante;
  
  console.log(`Nome: ${nome}, Idade: ${idade}, Nota de Biologia: ${biologia}`);
  console.log(`Nota de Filosofia (filosofando): ${filosofia}`);