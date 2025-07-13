import api from '../../services/api'
import { useState } from 'react'
import '../../styles/register.css'

function AtualizarPedido({open, onFechado, id, valorPedido, carregarPedidos}) {
  const [valped, setValorPedido] = useState(valorPedido)
  const [dtpdd, setDataPedido] = useState('')
  const [statped, setStatusPedido] = useState('')

  const registerSubmit = async (event) => {
    event.preventDefault()
    console.log(valped)

      const response = api.put(`/pedido/update/${id}`, {
        codped: id,
        valped,
        statped,
      })
      console.log(response.data)
    carregarPedidos();
    window.alert("Pedido atualizado com sucesso!")
    carregarPedidos();
      // Limpa os campos
      setDataPedido('')
      setStatusPedido('')
      onFechado();
    
  }

  if(!open) return null;
  return (

    <div onClick={onFechado} className='escuridao' >
    <div className='container'>
      
      <form id="register" onSubmit={registerSubmit} onClick={(e) => e.stopPropagation()}>
        <center><span id='register-text' style={{ fontWeight: "bold", textTransform: "capitalize", fontSize: "30px"}}>Atualizar pedidos</span></center>


        
             <select
          name="status"
          value={statped}
          onChange={(e) => setStatusPedido(e.target.value)}
        >
          <option value="" disabled>Selecione o novo status:</option>
          <option value="espera">Espera</option>
          <option value="pedido">Pedido</option>
          <option value="instalado">Instalado</option>
        </select>
      
        <button id ='butao' type='submit'>Atualizar</button>
        <button id='closeButton' type='button' onClick={onFechado}>Fechar</button>
      </form>

    
    
    </div>
   </div> 
  )
}

export default AtualizarPedido
