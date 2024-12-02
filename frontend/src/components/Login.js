import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('usuario');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/usuarios/login', { email, senha, tipo });
      localStorage.setItem('token', response.data.token);
      alert('Login bem-sucedido!');
      if (tipo === 'fornecedor') {
        navigate('/produtos'); // Redireciona para a página de produtos
      } else {
        navigate('/cesta'); // Redireciona para a página de cesta
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Login</h1>
      <form onSubmit={handleLogin} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input
            type="password"
            id="senha"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">Tipo</label>
          <select
            id="tipo"
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="usuario">Usuário</option>
            <option value="fornecedor">Fornecedor</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>
      <p className="mt-3 text-center">
        Não tem uma conta?{' '}
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate('/cadastro')}
        >
          Cadastre-se
        </button>
      </p>
    </div>
  );
};

export default Login;
