import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    api.post("/login", {
      usuario: usuario, 
      senha: senha,
    }).then((response) => {
      navigate('/register')
      console.log(response);
    })

    console.log(usuario, senha);
    /*try {
      // Exemplo de chamada para API - ajuste conforme sua API
      const resposta = await Api.post('/login', { username: usuario, password: senha })
      console.log('Login realizado com sucesso:', resposta.data)
      // Aqui você pode redirecionar ou salvar token, por exemplo
    } catch (erro) {
      console.error('Erro no login:', erro)
      // Aqui você pode mostrar uma mensagem de erro para o usuário
    }*/
  }

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
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
     
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              required 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
 
          </div>
          <button id='butaoLogin' type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login
