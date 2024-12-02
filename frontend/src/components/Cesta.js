import React, { useEffect, useState } from 'react';
import api from '../api';

const Cesta = () => {
  const [cesta, setCesta] = useState([]);

  useEffect(() => {
    const fetchCesta = async () => {
      try {
        const response = await api.get('/cesta');
        setCesta(response.data);
      } catch (error) {
        console.error('Erro ao carregar cesta:', error);
      }
    };

    fetchCesta();
  }, []);

  const handleRemoverProduto = async (id) => {
    try {
      await api.delete(`/cesta/${id}`);
      alert('Produto removido da cesta!');
      const cestaAtualizada = await api.get('/cesta');
      setCesta(cestaAtualizada.data);
    } catch (error) {
      console.error('Erro ao remover produto da cesta:', error);
    }
  };

  const calcularTotal = () => {
    return cesta.reduce((total, item) => total + item.produto.preco * item.quantidade, 0).toFixed(2);
  };

  return (
    <div className="sidebar bg-light p-3">
      <h2>Minha Cesta</h2>
      <ul className="list-group">
        {cesta.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {item.produto.nome} - Qtd: {item.quantidade}
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleRemoverProduto(item.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <h3 className="mt-3">Total: R$ {calcularTotal()}</h3>
    </div>
  );
};

export default Cesta;
