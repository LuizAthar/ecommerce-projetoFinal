const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const autenticarUsuario = require('../middlewares/autenticarUsuario'); // Middleware de autenticação

// Rotas de usuários
router.post('/login', UsuarioController.login); // Login não precisa de autenticação
router.post('/', UsuarioController.criarUsuario); // Cadastro de usuário não precisa de autenticação

// Rotas protegidas
router.get('/', autenticarUsuario, UsuarioController.listarUsuarios);
router.get('/:id', autenticarUsuario, UsuarioController.buscarUsuarioPorId);
router.put('/:id', autenticarUsuario, UsuarioController.atualizarUsuario);
router.delete('/:id', autenticarUsuario, UsuarioController.deletarUsuario);

module.exports = router;
