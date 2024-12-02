const ProdutoService = require('../services/ProdutoService');
const { Cesta } = require('../models'); // Importar o modelo Cesta para gerenciar dependências

class ProdutoController {
    static async criarProduto(req, res) {
        try {
            const produto = await ProdutoService.criarProduto(req.body);
            res.status(201).json(produto);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({ error: 'Erro ao criar produto' });
        }
    }

    static async listarProdutos(req, res) {
        try {
            const produtos = await ProdutoService.listarProdutos();
            res.status(200).json(produtos);
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }

    static async buscarProdutoPorId(req, res) {
        try {
            const produto = await ProdutoService.buscarProdutoPorId(req.params.id);
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json(produto);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }

    static async atualizarProduto(req, res) {
        try {
            const produtoAtualizado = await ProdutoService.atualizarProduto(req.params.id, req.body);
            if (!produtoAtualizado) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json({ message: 'Produto atualizado com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }

    static async deletarProduto(req, res) {
        try {
            const produtoId = req.params.id;

            // Remover entradas na tabela Cesta associadas ao produto
            await Cesta.destroy({ where: { produtoId } });

            // Remover o produto
            const resultado = await ProdutoService.deletarProduto(produtoId);
            if (!resultado) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json({ message: 'Produto deletado com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }
}

module.exports = ProdutoController;

