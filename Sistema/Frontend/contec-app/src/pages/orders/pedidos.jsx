
import TabelaUsuarios from '../../components/tables/usuarios';
import api from '../../services/api'
import { useState, useEffect } from 'react'
import { Box } from "@mui/material"
import PedidosPendentes from '../../components/tables/pedidosPendentes';
import VisualizarPedidos from '../../components/tables/todosPedidos';
import PedidosConcluidos from '../../components/tables/pedidosConcluidos';
import PedidosProducao from '../../components/tables/pedidosProducao';
import "../../styles/pedidos.css"


function Pedidos() {
    const [taAberto1, portao1] = useState(false);
    const [taAberto2, portao2] = useState(false);
    const [taAberto3, portao3] = useState(false);
    const [taAberto4, portao4] = useState(true);
    const [pedidos, setPedidos] = useState([]);
    const [pedidosPendentes, setPedidosPendentes] = useState([]);
    const [pedidosConcluidos, setPedidosConcluidos] = useState([]);
    const [pedidosProducao, setPedidosProducao] = useState([]);
   

  

    const carregarPedidos = () => {
    api.get('/pedido/getallcerto')
      .then(res => {setPedidos(res.data)})
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
    <center> <span id='pedidos-tittle'>Gerenciamento de pedidos:</span>
    <div className='button-pedidos'> 
     <button id='orders-button' type='button' onClick={() => {portao4(true), portao1(false), portao2(false), portao3(false)}}>Pedidos aguardando confirmação</button>
     <button id='orders-button' type='button' onClick={() => {portao2(true), portao1(false), portao4(false), portao3(false)}}>Pedidos em produção</button>
     <button id='orders-button' type='button' onClick={() => {portao3(true), portao1(false), portao2(false), portao4(false)}}>Pedidos concluídos</button>
     <button id='orders-button' type='button' onClick={() => {portao1(true), portao4(false), portao2(false), portao3(false)}}>Visualizar todos os pedidos</button>
    </div>
  </center>
    <VisualizarPedidos open={taAberto1} onFechado={() => portao1(false)} pedidos={pedidos} carregarPedidos={carregarPedidos}/> 
    <PedidosProducao open={taAberto2} onFechado={() => portao2(false)} pedidosProducao={pedidosProducao} carregarPedidos={carregarPedidos}/> 
    <PedidosConcluidos open={taAberto3} onFechado={() => portao3(false)} pedidosConcluidos={pedidosConcluidos} carregarPedidos={carregarPedidos}/>
    <PedidosPendentes open={taAberto4} onFechado={() => portao4(false)} pedidosPendentes={pedidosPendentes} carregarPedidos={carregarPedidos}/>

    {/* <Outlet pedidosPendentes={pedidosPendentes} pedidosConcluidos={pedidosConcluidos} 
    pedidosProducao={pedidosProducao} pedidos={pedidos} carregarPedidos={carregarPedidos}/> */}
  </Box>
  )
  
}

export default Pedidos
