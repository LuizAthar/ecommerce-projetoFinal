const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');
const autenticarUsuario = require('../middlewares/autenticarUsuario');

// Rotas protegidas para listar produtos para ambos os tipos de usuários
router.get('/', autenticarUsuario(), ProdutoController.listarProdutos);

// Rotas específicas para fornecedores
router.post('/', autenticarUsuario('fornecedor'), ProdutoController.criarProduto);
router.put('/:id', autenticarUsuario('fornecedor'), ProdutoController.atualizarProduto);
router.delete('/:id', autenticarUsuario('fornecedor'), ProdutoController.deletarProduto);

module.exports = router;
