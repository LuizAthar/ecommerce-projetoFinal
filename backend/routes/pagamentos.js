const express = require('express');
const router = express.Router();
const  PagamentoController  = require('../controllers/PagamentoController');
const autenticarUsuario = require('../middlewares/autenticarUsuario');

router.post('/', autenticarUsuario, PagamentoController.criarPagamento);
router.get('/', autenticarUsuario, PagamentoController.listarPagamentos);
router.get('/:id', autenticarUsuario, PagamentoController.buscarPagamentoPorId);
router.put('/:id', autenticarUsuario, PagamentoController.atualizarPagamento);
router.delete('/:id', autenticarUsuario, PagamentoController.deletarPagamento);


module.exports = router;
