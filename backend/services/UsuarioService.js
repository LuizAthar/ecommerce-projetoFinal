const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

class UsuarioService {
  static async criarUsuario(dados) {
    try {
      // Gera o hash da senha
      const hashedSenha = await bcrypt.hash(dados.senha, 10);
      dados.senha = hashedSenha;

      // Cria o usuário com a senha criptografada
      return await Usuario.create(dados);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  static async listarUsuarios() {
    return await Usuario.findAll();
  }

  static async buscarUsuarioPorId(id) {
    return await Usuario.findByPk(id);
  }

  static async atualizarUsuario(id, dados) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;

    // Atualiza a senha apenas se uma nova senha for fornecida
    if (dados.senha) {
      const hashedSenha = await bcrypt.hash(dados.senha, 10);
      dados.senha = hashedSenha;
    }

    await usuario.update(dados);
    return usuario;
  }

  static async deletarUsuario(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;

    await usuario.destroy();
    return true;
  }
}

module.exports = UsuarioService;
