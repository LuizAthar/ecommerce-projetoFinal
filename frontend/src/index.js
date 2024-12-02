import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Certifique-se de que o App.css ou index.css está configurado
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação global do Bootstrap

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
