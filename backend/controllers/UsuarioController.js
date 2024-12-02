const UsuarioService = require('../services/UsuarioService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario } = require('../models'); // Importação do modelo atualizado

class UsuarioController {
    static async login(req, res) {
        const { email, senha, tipo } = req.body; // Recebe o tipo de login enviado pelo frontend

        try {
            // Busca o usuário pelo email
            const usuario = await Usuario.findOne({ where: { email } });
            if (!usuario) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            // Valida a senha
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            // Valida o tipo de usuário
            if (tipo !== usuario.tipo) {
                return res.status(403).json({ error: 'Tipo de usuário inválido' });
            }

            // Gera o token JWT com o tipo de usuário incluído no payload
            const token = jwt.sign(
                { id: usuario.id, tipo: usuario.tipo },
                process.env.JWT_SECRET || 'defaultSecret',
                { expiresIn: '1h' }
            );

            res.status(200).json({ token });
        } catch (error) {
            // Adicione logs para depuração
            console.log('Tipo enviado:', tipo);
            console.log('Tipo no banco:', usuario.tipo);
            console.error('Erro ao realizar login:', error);
            res.status(500).json({ error: 'Erro ao realizar login' });
        }
    }

    static async criarUsuario(req, res) {
        try {
            const usuario = await UsuarioService.criarUsuario(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }

    static async listarUsuarios(req, res) {
        try {
            const usuarios = await UsuarioService.listarUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).json({ error: 'Erro ao listar usuários' });
        }
    }

    static async buscarUsuarioPorId(req, res) {
        try {
            const usuario = await UsuarioService.buscarUsuarioPorId(req.params.id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json(usuario);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }

    static async atualizarUsuario(req, res) {
        try {
            const usuario = await UsuarioService.atualizarUsuario(req.params.id, req.body);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    }

    static async deletarUsuario(req, res) {
        try {
            const resultado = await UsuarioService.deletarUsuario(req.params.id);
            if (!resultado) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
    }
}

module.exports = UsuarioController;

