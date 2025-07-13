import { useState, useEffect } from 'react';
import Cadastro from '../../components/register/register';
import TabelaUsuarios from '../../components/tables/usuarios';
import '../../styles/admin.css'
import api from "../../services/api.js"




function Admin(){
    const [taAberto, portao] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    const carregarUsuarios = () => {
    api.get('/user/getall')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Erro ao buscar usuários:', err));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);


    return(

        
        <div className='layout-container'>
        <header>
            <div className="logo-wrapper">
                <div className="logo-square"></div>
                <div className="logo-text">CONTEC</div>
            </div>
            <div className="page-title">Administração de Usuários</div>
        </header>
    

            <div className="layout-content-container">
    
      
    
        <nav className="sidebar">
            <div className="menu-items">
                <ul>
                    <li><a href="/home"><i className="fas fa-arrow-left menu-icon"></i>Voltar</a></li>
                </ul>
            </div>
        </nav>

 
        <main className="content">
            <div className="admin-actions">
                <button id="addUserBtn" className="action-button" onClick={() => portao(true)}>
                    <i className="fas fa-user-plus"></i> Novo Usuário
                </button>
               


            </div>

            <Cadastro open={taAberto} onFechado={() => portao(false)} carregarUsuarios={carregarUsuarios}  />
           
            <div className="dashboard-content">
                <div className="users-table-container">
                  
                      <TabelaUsuarios usuarios={usuarios} carregarUsuarios={carregarUsuarios}/>
                </div>
            </div>
        </main>
    </div>

        </div>
    )

}

export default Admin