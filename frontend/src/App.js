import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Produtos from './components/Produtos';
import Cesta from './components/Cesta';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/produtos" element={<Produtos tipoUsuario="fornecedor" />} />
        <Route path="/cesta" element={<Produtos tipoUsuario="usuario" />} />
        <Route path="/cesta" element={<Cesta />} />
      </Routes>
    </Router>
  );
};

export default App;
