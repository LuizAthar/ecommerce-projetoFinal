const { Fornecedor } = require('../models');

class FornecedorController {
  static async criarFornecedor(req, res) {
    try {
      const fornecedor = await Fornecedor.create(req.body);
      res.status(201).json(fornecedor);
    } catch (error) {
      console.error('Erro ao criar fornecedor:', error);
      res.status(500).json({ error: 'Erro ao criar fornecedor' });
    }
  }

  static async listarFornecedores(req, res) {
    try {
      const fornecedores = await Fornecedor.findAll();
      res.status(200).json(fornecedores);
    } catch (error) {
      console.error('Erro ao listar fornecedores:', error);
      res.status(500).json({ error: 'Erro ao listar fornecedores' });
    }
  }

  static async atualizarFornecedor(req, res) {
    try {
      const { id } = req.params;
      const [atualizado] = await Fornecedor.update(req.body, { where: { id } });
      if (!atualizado) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
      }
      res.status(200).json({ message: 'Fornecedor atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
      res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
    }
  }

  static async deletarFornecedor(req, res) {
    try {
      const { id } = req.params;
      const deletado = await Fornecedor.destroy({ where: { id } });
      if (!deletado) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
      }
      res.status(200).json({ message: 'Fornecedor deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
      res.status(500).json({ error: 'Erro ao deletar fornecedor' });
    }
  }
}

module.exports = FornecedorController;

