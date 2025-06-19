import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/login/login.jsx'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Cadastro from './pages/register/register.jsx'
import Header from './components/header.jsx'
import MenuLateral from './components/menuLateral/menuLateral.jsx'
import Admin from './pages/dashboard/admin/admin.jsx'
import TabelaUsuarios from './components/tables/usuarios.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LayoutLogin />}></Route>

        <Route path='/admin' element={<Admin />}/>
        <Route path="/" element={<LayoutDashboard />}>
        <Route path='dashboard' element={<Cadastro />}/>
          
        </Route>
      </Routes>
    </Router>
  )
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

function LayoutDashboard() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}


function LayoutLogin() {
  return (
    <div>
      <main>
        <TabelaUsuarios />
      </main>
    </div>
  );
}

export default App;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
