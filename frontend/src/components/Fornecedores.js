import React, { useState, useEffect } from 'react';
import api from '../api'; // Certifique-se de que o caminho está correto

function Fornecedores() {
    const [fornecedores, setFornecedores] = useState([]);
    const [novoFornecedor, setNovoFornecedor] = useState({
        nome: '',
        email: '',
        telefone: ''
    });

    useEffect(() => {
        carregarFornecedores();
    }, []);

    const carregarFornecedores = async () => {
        try {
            const response = await api.get('/fornecedores');
            setFornecedores(response.data);
        } catch (error) {
            console.error('Erro ao carregar fornecedores:', error);
            alert('Erro ao carregar fornecedores.');
        }
    };

    const cadastrarFornecedor = async (e) => {
        e.preventDefault();
        try {
            await api.post('/fornecedores', novoFornecedor);
            alert('Fornecedor cadastrado com sucesso!');
            setNovoFornecedor({ nome: '', email: '', telefone: '' });
            carregarFornecedores();
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor:', error);
            alert('Erro ao cadastrar fornecedor.');
        }
    };

    const deletarFornecedor = async (id) => {
        try {
            await api.delete(`/fornecedores/${id}`);
            alert('Fornecedor deletado com sucesso!');
            carregarFornecedores();
        } catch (error) {
            console.error('Erro ao deletar fornecedor:', error);
            alert('Erro ao deletar fornecedor.');
        }
    };

    return (
        <div>
            <h1>Fornecedores</h1>
            <form onSubmit={cadastrarFornecedor}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={novoFornecedor.nome}
                    onChange={(e) => setNovoFornecedor({ ...novoFornecedor, nome: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={novoFornecedor.email}
                    onChange={(e) => setNovoFornecedor({ ...novoFornecedor, email: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={novoFornecedor.telefone}
                    onChange={(e) => setNovoFornecedor({ ...novoFornecedor, telefone: e.target.value })}
                />
                <button type="submit">Cadastrar</button>
            </form>
            <h2>Lista de Fornecedores</h2>
            <ul>
                {fornecedores.map((fornecedor) => (
                    <li key={fornecedor.id}>
                        {fornecedor.nome} - {fornecedor.email} - {fornecedor.telefone}{' '}
                        <button onClick={() => deletarFornecedor(fornecedor.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Fornecedores;
