import api from '../../services/api'
import { useState } from 'react'
import '../../styles/register.css'
import { useNavigate } from 'react-router-dom';


function Cadastro({open, onFechado, carregarUsuarios}) {
  const [nome, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cargo, setCargo] = useState('')


  const registerSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await api.post("/user/create", {
        nome,
        senha,
        email,
        telefone,
        cargo,
      })
      console.log(response.data)
      carregarUsuarios();
      window.alert("Usuário Criado com sucesso!")// recarrega lista
      // Limpa os campos
      setEmail('')
      setUsuario('')
      setSenha('')
      setTelefone('')
      setCargo('')
      onFechado();
      
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error)
    }
  }

  if(!open) return null;
  return (

    <div onClick={onFechado} className='escuridao' >
    <div className='container'>
      
      <form id="register" onSubmit={registerSubmit} onClick={(e) => e.stopPropagation()}>
        <center><span id='register-text' style={{ fontWeight: "bold", textTransform: "capitalize", fontSize: "30px"}}>Cadastro de usuários</span></center>

 

        <input
          placeholder="Usuário"
          name='user'
          type='text'
          required
          value={nome}
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


       <input
          placeholder="Email"
          name='email'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

          <input
          placeholder="Telefone"
          name='telefone'
          type='number'
          required
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

             <select
          name="cargo"
          required
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        >
          <option value="" disabled>Selecione o setor</option>
          <option value="Administrador">Administração</option>
          <option value="Vendedor">Vendas</option>
          <option value="Instalador">Instalação</option>
        </select>
      
        <button id ='butao' type='submit'>Cadastrar</button>
        <button id='closeButton' type='button' onClick={() => {onFechado(); carregarUsuarios(); }}>Fechar</button>
      </form>

    
    
    </div>
   </div> 
  )
}

export default Cadastro
