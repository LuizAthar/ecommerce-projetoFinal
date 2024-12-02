E-commerce Projeto Final
Este projeto é um sistema de e-commerce desenvolvido como parte do trabalho final da disciplina. Ele inclui funcionalidades para cadastro de usuários, autenticação, gestão de produtos e integração com uma cesta de compras.
  ------ ------- ------ -------
Tecnologias Utilizadas
Backend: Node.js, Express, Sequelize
Frontend: React, Bootstrap
Banco de Dados: MySQL
 ------ ------- ------ -------
Funcionalidades

-Cadastro de contas de usuários (usuário/fornecedor).

-Autenticação com JWT.

-Cadastro, edição e exclusão de produtos (fornecedores).

-Adicionar produtos à cesta de compras (usuários).

-Exibição dos produtos cadastrados e controle de estoque.
 ------ ------- ------ -------
Configuração do Projeto
Backend
Navegue até a pasta backend:

cd backend
Instale as dependências:
npm install
 ------ ------- ------ -------
Configure as variáveis de ambiente criando um arquivo .env com os seguintes campos:
env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=ecommerce
JWT_SECRET=sua_chave_secreta
 ------ ------- ------ -------
Execute as migrações para criar as tabelas no banco:

-npx sequelize db:migrate 

-Inicie o servidor:

-npm start
-Frontend

-Navegue até a pasta frontend:

-cd frontend

-Instale as dependências:

-npm install

-Inicie o servidor de desenvolvimento:

-npm start
