
import api from '../../services/api'
import { useState } from 'react'
import '../../styles/orcamentos.css'




function Orcamentos() {


  return (

    <div className="container_budgets">
      <p id='txt_budgets'> Novo Orçamento </p>
      <form className='budgets_form'>
       <div className='namecontact_budgets'>

        <div className='contentname_budgets'>
          Nome do cliente:
        <input type="text" />

        </div>
      
          <div className='contentname_budgets'>
          Sobrenome:
        <input type="text" />

        </div>
      
         <div className='contentname_budgets'>
          Telefone para contato:
        <input type="number" />

        </div>
      
        </div>
        <div className='content_email_budgets'>
        Email para contato:
        <input type="email" />
        Endereço:
        <input type="text" />
        Modelo do portão desejado:
       <div className='radioinput_budgets'>
          Seccionado<input type="radio" name="typePortao" value="seccionado"/>
          Enrolar Liso<input type="radio" name="typePortao" value="enrolarliso"/>
          Enrolar Transvision<input type="radio" name="typePortao" value="enrolartransvision"/>
       </div>
        Cor
        <input type="text" />
        </div>

        <div className='namecontact_budgets'>
        <div className='contentmedidas_budgets'>

     
        Medida altura:
        <input type="text" />
        </div>
        <div className='contentmedidas_budgets'>
        Medida largura:
        <input type="text" />
           </div>
        </div>

        <button id='submitbudget_button' type="submit">Gerar orçamento</button>
      </form>


    </div> 

 
  
  )
}

export default Orcamentos
