import ContatosClientes from '../../components/tables/contatos'
import api from '../../services/api'
import { useState, useEffect } from 'react'
import { Box } from "@mui/material"
import "../../styles/clientes.css"

function Clientes() {

  const [contatosClientes, setContatosClientes] = useState([]);
  const carregarClientes = () => {


    api.get('/cliente/getallcerto')
      .then(res => setContatosClientes(res.data))
  
      .catch(err => console.error('Erro ao buscar os clientes:', err));
  }

    useEffect(() => {
      carregarClientes();
    }, []);
  
  return (


  <Box width="150vh" p="10px">
      <span id='clientes-header'>Informações dos clientes:</span>
      <ContatosClientes contatosClientes={contatosClientes} carregarClientes={carregarClientes}/>
      
   </Box>
  )
}

export default Clientes
