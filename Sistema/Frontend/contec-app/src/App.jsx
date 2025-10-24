import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/login/login.jsx'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/header/header.jsx'
import MenuLateral from './components/sideBar/menuLateral.jsx'
import Admin from './pages/admin/admin.jsx'
import HomePage from './pages/home/homePage.jsx'
import Ask from './pages/geminiChat/gemini.jsx'
import Programacao from './pages/schedule/programacao.jsx'
import Clientes from './pages/contacts/clientes.jsx'
import Orcamentos from './pages/budgets/orcamentos.jsx'
import Pedidos from './pages/orders/pedidos.jsx'
import { AuthProvider } from './context/authContext.jsx'
import PedidosPendentes from './components/tables/pedidosPendentes.jsx'
import PedidosProducao from './components/tables/pedidosProducao.jsx'
import PedidosConcluidos from './components/tables/pedidosConcluidos.jsx'
import VisualizarPedidos from './components/tables/todosPedidos.jsx'
import Catracas from './pages/catracas/catracas.jsx'


function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas sem layout */}
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/catracas" element={<Catracas />} />

        {/* Rotas com layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/programacao" element={<Programacao />} />
          <Route path="/orcamentos" element={<Orcamentos />} />
          <Route path="/clientes" element={<Clientes />} />
          
          <Route path="/pedidos" element={<Pedidos />}>
             <Route path="pendentes" element={<PedidosPendentes />} />
             <Route path="producao" element={<PedidosProducao />} />
             <Route path="concluidos" element={<PedidosConcluidos />} />
             <Route path="todos" element={<VisualizarPedidos />} />
          </Route>
        
      


        </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
     <div className="layout-container">
      <Header />
      <main className="layout-content-container">
        <MenuLateral />

        <Outlet />

      </main>
    </div>
  );
}



export default App;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </StrictMode>,
)
