import "../../styles/menuLateral.css"
import { useState } from "react";
import "../sideBar/sibar.css"
import { useAuth } from "../../context/authContext";



function MenuLateral( ){

    const { usuario } = useAuth();

    return(
       <div>
        <nav class="sidebar">
            <div class="menu-items">
                <ul>
                    <li><a id="dashboardbutton" href='/home' ><i class="fas fa-solid fa-house menu-icon"></i>Home</a></li>
                    <li><a id="dashboardbutton" href='/orcamentos' ><i class="fas fa-file-invoice-dollar menu-icon"></i>Orçamentos</a></li>
                    <li><a id="dashboardbutton" href='/pedidos' ><i class="fas fa-clipboard-list menu-icon"></i>Pedidos</a></li>
                    <li><a id="dashboardbutton" href='/programacao'><i class="fas fa fa-calendar menu-icon" aria-hidden="true"></i>Programação</a></li>
                    <li><a id="dashboardbutton" href='/clientes' > <i class="fas fa-users menu-icon"></i>Clientes</a></li>
                
                </ul>
            </div>
            <div class="bottom-menu">
                <div class="admin-option">
                    <a href="/ask"><i class="fas fa fa-question-circle menu-icon" aria-hidden="true"></i>Alguma dúvida?</a>
                     {(usuario?.cargo === "adm" || usuario?.cargo === "Administrador")  && (<a href="/admin"><i class="fas fa-user-shield menu-icon"></i>Administrador</a>)}
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