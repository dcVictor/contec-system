
import api from '../../services/api'
import { useState } from 'react'

function Orcamentos({open, onFechado}) {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [cracha, setCracha] = useState('')
  const [users, setUsers] = useState([])

  const registerSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await api.post("/register", {
        cracha,
        usuario,
        senha,
      })
      console.log(response.data)

      // Adiciona o usuário à lista local
      setUsers([...users, { id: cracha, user: usuario }])

      // Limpa os campos
      setCracha('')
      setUsuario('')
      setSenha('')
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error)
    }
  }

  if(!open) return null;
  return (

    <div onClick={onFechado} className='escuridao' >
    <div className='container'>
      
      <form id="register" onSubmit={registerSubmit} onClick={(e) => e.stopPropagation()}>
        <h1 id='login'><center>Orcamentos</center></h1>

        <input
          placeholder="Código do crachá"
          name='id'
          type='text'
          required
          value={cracha}
          onChange={(e) => setCracha(e.target.value)}
        />

        <input
          placeholder="Usuário"
          name='user'
          type='text'
          required
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          placeholder="Senha"
          name='senha'
          type='password'
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

      
        <button id ='butao' type='submit'>Cadastrar</button>
        <button id='closeButton' type='submit' onClick={onFechado}>Fechar</button>
      </form>

      {/* Lista de usuários cadastrados localmente */}
      {users.map((user) => (
        <div key={user.id}>
          <div>
            <p>Crachá: {user.id}</p>
            <p>Nome: {user.user}</p>
          </div>
        </div>
      ))}
    </div>
   </div> 
  )
}

export default Orcamentos
