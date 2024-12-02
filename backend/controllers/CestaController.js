const { Cesta, Produto } = require('../models');

class CestaController {
    static async adicionarProduto(req, res) {
        try {
            const { produtoId, quantidade } = req.body;
            const userId = req.userId;
    
            // Verifica se o produto existe
            const produto = await Produto.findByPk(produtoId);
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
    
            // Verifica se há estoque suficiente
            if (produto.quantidade < quantidade) {
                return res.status(400).json({ error: 'Estoque insuficiente' });
            }
    
            // Adiciona produto à cesta
            const cesta = await Cesta.create({ produtoId, quantidade, userId });
    
            // Atualiza o estoque do produto
            produto.quantidade -= quantidade;
            await produto.save();
    
            res.status(201).json(cesta);
        } catch (error) {
            console.error('Erro ao adicionar produto à cesta:', error);
            res.status(500).json({ error: 'Erro ao adicionar produto à cesta' });
        }
    }

    static async listarProdutos(req, res) {
        try {
            const userId = req.userId; // Obtém o ID do usuário autenticado
            const cestas = await Cesta.findAll({
                where: { userId },
                include: [{ model: Produto, as: 'produto' }],
            });
            res.status(200).json(cestas);
        } catch (error) {
            console.error('Erro ao listar produtos da cesta:', error);
            res.status(500).json({ error: 'Erro ao listar produtos da cesta' });
        }
    }

    static async removerProduto(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId; // Obtém o ID do usuário autenticado

            const resultado = await Cesta.destroy({ where: { id, userId } });
            if (!resultado) {
                return res.status(404).json({ error: 'Produto não encontrado na cesta' });
            }

            res.status(200).json({ message: 'Produto removido da cesta com sucesso' });
        } catch (error) {
            console.error('Erro ao remover produto da cesta:', error);
            res.status(500).json({ error: 'Erro ao remover produto da cesta' });
        }
    }
}

module.exports = CestaController;
