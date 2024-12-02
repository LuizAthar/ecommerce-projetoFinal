const PagamentoService = require('../services/PagamentoService');

class PagamentoController {
  static async criarPagamento(req, res) {
    try {
      const userId = req.userId; // Obtém o ID do usuário autenticado
      const pagamento = await PagamentoService.criarPagamento({ ...req.body, userId });
      res.status(201).json(pagamento);
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      res.status(500).json({ error: 'Erro ao criar pagamento' });
    }
  }

  static async listarPagamentos(req, res) {
    try {
      const userId = req.userId; // Obtém o ID do usuário autenticado
      const pagamentos = await PagamentoService.listarPagamentos(userId);
      res.status(200).json(pagamentos);
    } catch (error) {
      console.error('Erro ao listar pagamentos:', error);
      res.status(500).json({ error: 'Erro ao listar pagamentos' });
    }
  }

  static async buscarPagamentoPorId(req, res) {
    try {
      const userId = req.userId; // Obtém o ID do usuário autenticado
      const pagamento = await PagamentoService.buscarPagamentoPorId(req.params.id, userId);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
      res.status(200).json(pagamento);
    } catch (error) {
      console.error('Erro ao buscar pagamento:', error);
      res.status(500).json({ error: 'Erro ao buscar pagamento' });
    }
  }

  static async atualizarPagamento(req, res) {
    try {
      const userId = req.userId; // Obtém o ID do usuário autenticado
      const pagamento = await PagamentoService.atualizarPagamento(req.params.id, req.body, userId);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
      res.status(200).json({ message: 'Pagamento atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar pagamento:', error);
      res.status(500).json({ error: 'Erro ao atualizar pagamento' });
    }
  }

  static async deletarPagamento(req, res) {
    try {
      const userId = req.userId; // Obtém o ID do usuário autenticado
      const resultado = await PagamentoService.deletarPagamento(req.params.id, userId);
      if (!resultado) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
      res.status(200).json({ message: 'Pagamento deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar pagamento:', error);
      res.status(500).json({ error: 'Erro ao deletar pagamento' });
    }
  }
}

module.exports = PagamentoController;
