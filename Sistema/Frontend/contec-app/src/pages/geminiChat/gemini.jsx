import { useState } from 'react';
import "../../styles/gemini.css"



function Ask(){
    return(

        
        <div className='layout-container'>
        <header>
            <div className="logo-wrapper">
                <div className="logo-square"></div>
                <div className="logo-text">CONTEC</div>
            </div>
            <div className="page-title">Perguntas gerais - Gemini </div>
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
           

           
            <div className="dashboard-content">
                
                
                <div className='inputask'><input id="input-ask"
                placeholder="Pergunte algo"
                name='ask'
                type='text'
                required  /> 
                <button id ='butaoask' type='submit'>Perguntar</button> </div>

                
          </div>
        </main>
    </div>

        </div>
    )

}

export default Ask