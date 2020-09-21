# Recuperação de senha
**Requisitos funcionais**
- O usuário deve porder recuperar a senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos não funcionais**
- Utilizar Mailtrap para tstarenvios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer  em segundo plano (background job);

**Regras de negócio**
- O link enviado por e-mail para resetar a senha, deve expirar em 2hors;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil
**RF**
- O usuário deve poder atualizar seu nome, senha e email;
**RNF**
**RN**
- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador
**RF**
- O usuário deve poder listar seus agendamento de um dia específico;
- O prestador deve receber uma notíficação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- Os agendamentos do prestador deve ser armazenada em cache;
- As notificações do prestador devem ser armazenadas no mongoDB;
- As notificações do prestador devem ser anviadas em tempo-real utilizando Socket.io;

**RN**
- A notificação deve ter um status de lida ou não lidas, para que o prestador possa controlar;

# Agendamento de serviços
**RF**
- O usuário deve poder listar todos os prestadores de serviço cadastrado;
- O usuário deve porder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder lsitar os horários disponíveis em um dia específico 
**RNF**
- Al istagem de prestadores deve ser armazenada em cache;


**RN**
- Cada agendamento deve durar 1h extamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não poder agendar serviços consigo;