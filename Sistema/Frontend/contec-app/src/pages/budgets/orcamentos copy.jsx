
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
        <input type="text" placeholder='Ex: Victor Raiel Babinski'/>

        </div>
      
          <div className='contentname_budgets'>
          CPF:
        <input type="number" placeholder='Ex: 12345678901' />

        </div>
      
         <div className='contentname_budgets'>
          Telefone para contato:
        <input type="number" placeholder='Ex: 49901010101'/>

        </div>
      
        </div>



         <div className='namecontact_budgets'>

        <div className='contentname_budgets1'>
          Email:
        <input type="email" placeholder='Ex: uffs@contec.com' />

        </div>
        
          <div className='contentname_budgets1'>
          Data do pedido:
        <input type="number" placeholder='YYYY/MM/DD'/>

        </div>
      
          <div className='contentname_budgets1'>
          Logradouro:
        <input type="text" placeholder='Ex: Rua Gian Carlo Denio Raquel' />

        </div>
      
         <div className='contentname_budgets1'>
          Número:
        <input type="number" placeholder='Ex: 180'/>

        </div>
      
        </div>

        <div className='namecontact_budgets'>

        <div className='contentname_budgets1'>
          Bairro:
        <input type="text" placeholder='Ex: Uffs do sol' />

        </div>
      
          <div className='contentname_budgets1'>
          Cidade:
        <input type="text" placeholder='Ex: Chapecó' />

        </div>
      
         <div className='contentname_budgets1'>
          UF:
        <input type="text" placeholder='Ex: SC' />

        </div>
        
         <div className='contentname_budgets1'>
          CEP:
        <input type="number" placeholder='Ex: 89801'/>

        </div>
      
        </div>
        <div className='namecontact_budgets'>
        <div className='contentmedidas_budgets'>


     
        Medida altura:
        <input type="text" placeholder='Ex: 4,5' />
        </div>
        <div className='contentmedidas_budgets'>
        Medida comprimento:
        <input type="text" placeholder='Ex: 3,2'/>
           </div>
        </div>

        <button id='submitbudget_button' type="submit">Gerar orçamento</button>
      </form>


    </div> 

 
  
  )
}

export default Orcamentos
