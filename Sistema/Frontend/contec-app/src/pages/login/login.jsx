import React, { useState } from 'react'
import '../../styles/login.css'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../context/authContext' // importa o hook

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const { login } = useAuth() // pega a função login do contexto

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await api.post("/user/login", {
      username: username,
      password: password,
    });
    console.log(response.data);

    const { token, user } = response.data;  // Pega token e dados do usuário
    login(token, user); // salva ambos no contexto
    navigate('/home');
  } catch (error) {
    console.error("Erro no login:", error);
    alert("Usuário ou senha inválidos");
  }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <div className="logo-wrapper">
            <div className="logo-square"></div>
            <div className="logo-text">CONTEC</div>
          </div>
        </div>
        <h1>Login</h1>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Usuário"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />

          </div>
          <button id='butaoLogin' type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login
