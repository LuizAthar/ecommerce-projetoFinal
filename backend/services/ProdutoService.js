const { Produto } = require('../models');

class ProdutoService {
    static async criarProduto(dados) {
        return await Produto.create(dados);
    }

    static async listarProdutos() {
        return await Produto.findAll();
    }

    static async buscarProdutoPorId(id) {
        return await Produto.findByPk(id);
    }

    static async atualizarProduto(id, dadosAtualizados) {
        const [atualizado] = await Produto.update(dadosAtualizados, { where: { id } });
        return atualizado; // Retorna 1 se atualizado, 0 caso contrário
    }

    static async deletarProduto(id) {
        const resultado = await Produto.destroy({ where: { id } });
        return resultado;
    }
}

module.exports = ProdutoService;
