
import TabelaUsuarios from '../../components/tables/usuarios';
import api from '../../services/api'
import { useState, useEffect } from 'react'
import { Box } from "@mui/material"
import PedidosPendentes from '../../components/tables/pedidosPendentes';
import VisualizarPedidos from '../../components/tables/todosPedidos';
import PedidosConcluidos from '../../components/tables/pedidosConcluidos';
import PedidosProducao from '../../components/tables/pedidosProducao';
import { useNavigate, Outlet, Link } from 'react-router-dom';


function Pedidos() {
    const [taAberto, portao] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [pedidosPendentes, setPedidosPendentes] = useState([]);
    const [pedidosConcluidos, setPedidosConcluidos] = useState([]);
    const [pedidosProducao, setPedidosProducao] = useState([]);
    const navigate = useNavigate();

    const producao = () => {
      navigate('/pedidos/producao')
    };
    
    const pendentes = () => {
      navigate('/pedidos/pendentes')
    };
    
    const concluidos = () => {
      navigate('/pedidos/concluidos')
    };
    
    const todos = () => {
      navigate('/pedidos/todos')
    };
    

    const carregarPedidos = () => {
    api.get('/pedido/getallcerto')
      .then(res => setPedidos(res.data))
      .catch(err => console.error('Erro ao buscar pedidos:', err));
  
    api.get('/pedido/getpendentes')
      .then(res => setPedidosPendentes(res.data))
      .catch(err => console.error('Erro ao buscar pedidos:', err));

    api.get('/pedido/getconcluidos')
      .then(res => setPedidosConcluidos(res.data))
      .catch(err => console.error('Erro ao buscar pedidos:', err));

    api.get('/pedido/getproducao')
      .then(res => setPedidosProducao(res.data))
      .catch(err => console.error('Erro ao buscar pedidos:', err));
};

  useEffect(() => {
    carregarPedidos();
  }, []);

  return(

  <Box width="150vh" p="10px">
     <button id='closeButton' type='button' onClick={pendentes}>Pedidos aguardando confirmação</button>
     <button id='closeButton' type='button' onClick={producao}>Pedidos em produção</button>
     <button id='closeButton' type='button' onClick={concluidos}>Pedidos concluídos</button>
     <button id='closeButton' type='button' onClick={todos}>Visualizar todos os pedidos</button>
     <VisualizarPedidos pedidos={pedidos} carregarPedidos={carregarPedidos}/> 
    <PedidosProducao pedidosProducao={pedidosProducao} carregarPedidos={carregarPedidos}/> 
    <PedidosConcluidos pedidosConcluidos={pedidosConcluidos} carregarPedidos={carregarPedidos}/>
    <PedidosPendentes pedidosPendentes={pedidosPendentes} carregarPedidos={carregarPedidos}/>

    {/* <Outlet pedidosPendentes={pedidosPendentes} pedidosConcluidos={pedidosConcluidos} 
    pedidosProducao={pedidosProducao} pedidos={pedidos} carregarPedidos={carregarPedidos}/> */}
  </Box>
  )
  
}

export default Pedidos
