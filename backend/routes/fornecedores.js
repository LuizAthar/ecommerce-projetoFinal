const express = require('express');
const FornecedorController = require('../controllers/FornecedorController');
const autenticarUsuario = require('../middlewares/autenticarUsuario');
const router = express.Router();

router.post('/', autenticarUsuario, FornecedorController.criarFornecedor);
router.get('/', autenticarUsuario, FornecedorController.listarFornecedores);
router.put('/:id', autenticarUsuario, FornecedorController.atualizarFornecedor);
router.delete('/:id', autenticarUsuario, FornecedorController.deletarFornecedor);

module.exports = router;
