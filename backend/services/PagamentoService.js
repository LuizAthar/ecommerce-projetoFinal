const { Pagamento } = require('../models');

class PagamentoService {
  static async criarPagamento(dados) {
    return await Pagamento.create(dados);
  }

  static async listarPagamentos() {
    return await Pagamento.findAll();
  }

  static async buscarPagamentoPorId(id) {
    return await Pagamento.findByPk(id);
  }

  static async atualizarPagamento(id, dados) {
    return await Pagamento.update(dados, { where: { id } });
  }

  static async deletarPagamento(id) {
    return await Pagamento.destroy({ where: { id } });
  }
}

module.exports = PagamentoService;
