import { useState } from 'react';
import Cadastro from '../../register/register';
import TabelaUsuarios from '../../../components/tables/usuarios';
import './admin.css';



function Admin(){
    const [taAberto, portao] = useState(false);
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
                    <li><a href="/dashboard"><i className="fas fa-arrow-left menu-icon"></i>Voltar</a></li>
                </ul>
            </div>
        </nav>

 
        <main className="content">
            <div className="admin-actions">
                <button id="addUserBtn" className="action-button" onClick={() => portao(true)}>
                    <i className="fas fa-user-plus"></i> Novo Usuário
                </button>
               


            </div>

            <Cadastro open={taAberto} onFechado={() => portao(false)} />
           
            <div className="dashboard-content">
                <div className="users-table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Nome</th>
                                <th>Grupo</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id="usersTableBody">
                          
                        
                        </tbody>
                       
                    </table>
                      <TabelaUsuarios />
                </div>
            </div>
        </main>
    </div>

        </div>
    )

}

export default Admin