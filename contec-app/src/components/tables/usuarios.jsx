import { useEffect, useState } from 'react';
import React from 'react'
import './usuarios.css'
import api from '../../services/api'


function TabelaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);


  const carregarUsuarios = () => {
    api.get('/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Erro ao buscar usuários:', err));
  };

  useEffect(() => {
    carregarUsuarios(); // primeira chamada
  }, []);



  return (
    <div className="p-4">
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Crachá</th>
            <th>Usuário</th>
            <th>Senha (bcrypt)</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, index) => (
            <tr key={index}>
              <td>{u.cracha}</td>
              <td>{u.usuario}</td>
              <td style={{ maxWidth: '400px', wordBreak: 'break-word' }}>{u.senha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaUsuarios;
