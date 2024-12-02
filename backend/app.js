'use strict';

const express = require('express');
const produtosRoutes = require('./routes/produtos'); // Ajuste o caminho conforme necessário
const cestaRoutes = require('./routes/cesta');
const db = require('./models'); // Importa o banco de dados configurado
const pagamentoRoutes = require('./routes/pagamentos');
const usuariosRoutes = require('./routes/usuarios');
const fornecedorRoutes = require('./routes/fornecedores');
const loginRoutes = require('./routes/usuarios');




require('dotenv').config();


const PORT = 3000;

// Middlewares
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3001', // URL do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Certifique-se de incluir 'Authorization' se usar tokens JWT
};

app.use(cors(corsOptions));



app.use(express.json()); // Habilita JSON no corpo das requisições

// Rotas
app.use('/produtos', produtosRoutes); // Usa as rotas de produtos
app.use('/cesta', cestaRoutes);
app.use('/pagamentos', pagamentoRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/fornecedores', fornecedorRoutes);
app.use('/usuarios', loginRoutes);



// Inicia a conexão com o banco de dados e o servidor
db.sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
    return db.sequelize.sync({ alter: true }); // Sincroniza os modelos 
  })
  .then(() => {
    console.log('Modelos sincronizados com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

module.exports = app;
