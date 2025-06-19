import './menuLateral.css'
import { useState } from "react";



function MenuLateral( {setClientes, setHome, setRelatorios, setPedidos, setInstalacoes, setManutencoes, setOrcamentos} ){

    return(
       <div>
        <nav class="sidebar">
            <div class="menu-items">
                <ul>
                    <li><button id="dashboardbutton" onClick={() => setHome(true)}><i class="fas fa-solid fa-house menu-icon"></i>Home</button></li>
                    <li><button id="dashboardbutton" onClick={() => setRelatorios(true)}><i class="fas fa-chart-bar menu-icon"></i>Relatórios</button></li>
                    <li><button id="dashboardbutton" onClick={() => setPedidos(true)}><i class="fas fa-clipboard-list menu-icon"></i>Pedidos</button></li>
                    <li><button id="dashboardbutton" onClick={() => setInstalacoes(true)}><i class="fas fa-hard-hat menu-icon"></i>Instalações</button></li>
                    <li><button id="dashboardbutton" onClick={() => setManutencoes(true)}><i class="fas fa-tools menu-icon"></i>Manutenções</button></li>
                    <li><button id="dashboardbutton" onClick={() => setOrcamentos(true)}><i class="fas fa-file-invoice-dollar menu-icon"></i>Orçamentos</button></li>
                    <li><button id="dashboardbutton" onClick={() => setClientes(true)}> <i class="fas fa-users menu-icon"></i>Clientes</button></li>
                </ul>
            </div>
            <div class="bottom-menu">
                <div class="admin-option">
                    <a href="/admin"><i class="fas fa-user-shield menu-icon"></i>Administrador</a>
                </div>
                <div class="logout-container">
                    <a href="/" id="logout"><i class="fas fa-sign-out-alt menu-icon"></i>Logout</a>
                </div>
            </div>
        </nav>
       </div>
    )
} 

export default MenuLateral;