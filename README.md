# Pre-requisitos
  - docker https://docs.docker.com/get-docker/
  - docker-composer https://docs.docker.com/compose/install/

*Obs caso seu docker precise rodar como root utilize o comando `sudo usermod -a -G docker $USER` para colocar o docker no seu grupo de usuário também.*

# Desenvolvimento
 - Utilizar mesma versão do node `nvm install`, para instaltar https://github.com/nvm-sh/nvm#installing-and-updating
 - Instalar dependencias `yarn` ou `npm i`
 - Configurar husky `yarn prepare` ou `npm run prepare`
 - Iniciar containers `docker-compose up`
 - Iniciar aplicação `yarn start` ou `npm start`
 - Rotas disponíveis em http://localhost:5050
*Na primiera execução pode demorar um pouco para baixar as imagens do docker e fazer o composer install*

# Documentação de Rotas
  - Projeto em execução
  - Disponível em http://localhost:5050/api-docs/ (Andamento)

# Features
  - Cadastrar detalhes da conta (Entregue)
  - Consultar detalhes da conta (Entregue)
  - Envio de documento no formato pdf (Entregue)
  - Cadastro de novo usuário (Entregue)
  - Login (Entregue)
  - Criar pedido para abrir conta (Andamento)

# Testes
  - Execute o comando `yarn test:ci` para rodar todos os testes com coverage
  - Execute o comando `yarn test:unit` para rodar todos os testes unitários
  - Execute o comando `yarn test:integration` para rodar todos os testes integração