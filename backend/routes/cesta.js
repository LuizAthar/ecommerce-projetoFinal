const express = require('express');
const router = express.Router();
const CestaController = require('../controllers/CestaController');
const autenticarUsuario = require('../middlewares/autenticarUsuario');

// Rotas protegidas para usuários
router.post('/', autenticarUsuario('usuario'), CestaController.adicionarProduto);
router.get('/', autenticarUsuario('usuario'), CestaController.listarProdutos);
router.delete('/:id', autenticarUsuario('usuario'), CestaController.removerProduto);

module.exports = router;
