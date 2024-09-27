 # Atividade do leleo  
 ## 2° ano sesc centro

  # Guia Do Usuário

  ### Está Página É Segura

  - esse site é o mais seguro do planeta, possui 5 cães de guarda em cada entrada, fora o quartel general no centro

  ### Quais ultilidades?
  
  O código é uma aplicação em Node.js que oferece funcionalidades para o gerenciamento de compromissos e autenticação de usuários. Ele permite que os usuários se registrem, façam login, agendem compromissos e gerenciem esses compromissos. A interação com o usuário é feita através do terminal.

  ### quem pode acessar?
 
 - qualquer pessoa, basta fazer login ou registrar

  ### como acessar?

 - basta colocar a senha e o email que você registrou no login, esperar alguns segundos e voilà 
 
  ### quanto paga pelo serviço?

 - como é um serviço top de linha, o melhor que tem, cobramos R$90.00 mensais

  ### Esqueci Minha Senha

  - caso tenha esquecido sua senha, entre em contato com nossos atendentes que estão disponiveis às 13:00 - 21:00, eles irão responder suas duvidas, problemas ou dificuldades com a página
 
  ### explicação os comandos:

 - criptografar(senha): Esta função usa o algoritmo SHA-256 para criptografar a senha fornecida e retorna o hash hexadecimal. Isso é utilizado para garantir que as senhas sejam armazenadas de forma segura.

validacaoUsername(username): Verifica se o nome de usuário é válido, isto é, se contém apenas caracteres alfanuméricos e tem entre 1 e 12 caracteres. A função retorna true se a validação for bem-sucedida e false caso contrário.
    
*validacaoSenha(senha): Garante que a senha atenda aos requisitos de complexidade. A senha deve ter entre 6 e 12 caracteres e incluir letras maiúsculas e minúsculas, números e caracteres especiais. A função utiliza uma expressão regular para essa validação e retorna true ou false.

salvarAgendamento(agendamentos): Salva os agendamentos em um arquivo JSON chamado agendamentos.json. Converte o objeto de agendamentos para JSON e escreve no arquivo. Em caso de erro, exibe uma mensagem de erro.

salvarUser(username, senha): Registra um novo usuário. Lê o arquivo users.json para verificar se o nome de usuário já existe. Se não existir, criptografa a senha e salva o usuário no arquivo. Retorna true se o usuário for salvo com sucesso e false se o nome já estiver em uso.

checarUser(username, senha): Verifica se as credenciais de um usuário estão corretas para o login. Lê o arquivo users.json, criptografa a senha fornecida e compara com a senha armazenada. Retorna true se as credenciais forem válidas e false caso contrário.

visualizarAgendamento(username): Exibe todos os compromissos agendados para o usuário. Lê os agendamentos do arquivo agendamentos.json, filtra por usuário e mostra as informações dos compromissos. Oferece opções para voltar ao menu principal, editar ou deletar um agendamento.

macarAgendamento(username): Permite que o usuário agende um novo compromisso. Solicita informações sobre o compromisso e a data, e salva no arquivo agendamentos.json. Em caso de erro, exibe uma mensagem e pede para tentar novamente.

formatarData(date): Formata uma data para o formato DD/MM/AAAA HH:MM. Utiliza métodos de manipulação de data para garantir que a data seja apresentada de forma padronizada.

dataHora(dataH): Converte uma string de data e hora no formato DD/MM/AAAA HH:MM para um objeto Date. Essa função é utilizada para garantir que a entrada do usuário seja interpretada corretamente.

formatarTempo(tempo): Formata o tempo restante até um compromisso em horas e minutos. Utiliza cálculos para converter o tempo restante em uma string legível.

mostrarOpcoes(username): Exibe um menu com opções para agendar um compromisso, verificar compromissos ou sair. Dependendo da escolha do usuário, chama a função correspondente.

registro(): Gerencia o processo de registro de um novo usuário, pedindo o nome de usuário e a senha. Valida as entradas e salva o usuário, ou solicita novas entradas em caso de erro.

promptLogin(): Gerencia o processo de login do usuário, pedindo nome de usuário e senha. Se as credenciais estiverem corretas, exibe os compromissos do usuário; caso contrário, solicita novas entradas.

editarAgendamento(username, usuariosAgendados): Permite que o usuário edite um agendamento existente. Oferece opções para alterar a data ou o conteúdo do compromisso e atualiza o arquivo agendamentos.json com as mudanças.

deletarAgendamento(username, id): Remove um compromisso do arquivo agendamentos.json com base no ID fornecido. Verifica se o compromisso pertence ao usuário e exclui-o, ou exibe uma mensagem de erro se o compromisso não for encontrado ou o usuário não tiver permissão.

mostrarMenu(): Exibe o menu inicial, permitindo ao usuário escolher entre registrar um novo usuário ou fazer login. Chama as funções apropriadas com base na escolha do usuário.

