import React, { useState, useEffect } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Produtos = ({ tipoUsuario }) => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const handleCadastrar = async (novoProduto) => {
    try {
      const response = await api.post('/produtos', novoProduto);
      setProdutos([...produtos, response.data]); // Atualiza a lista em tempo real
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  const handleAdicionarCesta = async (produtoId, quantidade) => {
    try {
      await api.post('/cesta', { produtoId, quantidade });
      const response = await api.get('/produtos'); // Atualiza a lista de produtos
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao adicionar produto à cesta:', error);
    }
  };

  const handleRemoverProduto = async (id) => {
    try {
      await api.delete(`/produtos/${id}`);
      alert('Produto removido com sucesso!');
      // Atualiza a lista de produtos
      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      alert('Erro ao remover o produto.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Produtos</h1>

      {/* Formulário para cadastrar produtos */}
      {tipoUsuario === 'fornecedor' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const novoProduto = {
              nome: e.target.nome.value,
              descricao: e.target.descricao.value,
              preco: parseFloat(e.target.preco.value),
              quantidade: parseInt(e.target.quantidade.value, 10),
            };
            handleCadastrar(novoProduto);
            e.target.reset(); // Limpa o formulário após o envio
          }}
        >
          <h2>Cadastrar Produto</h2>
          <input name="nome" placeholder="Nome" required />
          <input name="descricao" placeholder="Descrição" required />
          <input name="preco" type="number" placeholder="Preço" required />
          <input name="quantidade" type="number" placeholder="Quantidade" required />
          <button type="submit">Cadastrar</button>
        </form>
      )}

      {/* Lista de produtos */}
      <ul className="list-group mt-4">
        {produtos.map((produto) => (
          <li key={produto.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {produto.nome} - R$ {produto.preco} (Estoque: {produto.quantidade})
            </div>
            <div>
              {tipoUsuario === 'usuario' && (
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleAdicionarCesta(produto.id, 1)}
                >
                  Adicionar à Cesta
                </button>
              )}
              {tipoUsuario === 'fornecedor' && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoverProduto(produto.id)}
                >
                  Remover
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produtos;
