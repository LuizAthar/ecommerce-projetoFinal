import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bem-vindo</h1>
      <p>Escolha uma opção:</p>
      <button onClick={() => navigate('/login')}>Fazer Login</button>
      <button onClick={() => navigate('/cadastro')}>Cadastrar</button>
    </div>
  );
};

export default Home;
