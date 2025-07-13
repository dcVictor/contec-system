import api from '../../services/api';
import { useState } from 'react';
import '../../styles/orcamentos.css';

function Orcamentos() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    dataPedido: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: '',
    altura: '',
    comprimento: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/pedido/createOrcamento', formData);

      alert("Orçamento gerado com sucesso!");

      // Limpar o formulário após envio
      setFormData({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        dataPedido: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
        altura: '',
        comprimento: ''
      });

    } catch (error) {
      console.error("Erro ao gerar orçamento:", error);
      alert("Erro ao gerar orçamento.");
    }
  };

  return (
    <div className="container_budgets">
      <p id='txt_budgets'> Novo Orçamento </p>
      <form className='budgets_form' onSubmit={handleSubmit}>
        <div className='namecontact_budgets'>
          <div className='contentname_budgets'>
            Nome do cliente:
            <input
              name="nome"
              type="text"
              required
              onChange={handleChange}
              value={formData.nome}
              placeholder='Ex: Victor Raiel Babinski'
            />
          </div>
          <div className='contentname_budgets'>
            CPF:
            <input
              name="cpf"
              type="number"
              required
              onChange={handleChange}
              value={formData.cpf}
              placeholder='Ex: 12345678901'
            />
          </div>
          <div className='contentname_budgets'>
            Telefone para contato:
            <input
              name="telefone"
              type="number"
              required
              onChange={handleChange}
              value={formData.telefone}
              placeholder='Ex: 49901010101'
            />
          </div>
        </div>

        <div className='namecontact_budgets'>
          <div className='contentname_budgets1'>
            Email:
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              value={formData.email}
              placeholder='Ex: uffs@contec.com'
            />
          </div>
          <div className='contentname_budgets1'>
            Data do pedido:
            <input
              name="dataPedido"
              type="date"
              required
              onChange={handleChange}
              value={formData.dataPedido}
            />
          </div>
          <div className='contentname_budgets1'>
            Logradouro:
            <input
              name="logradouro"
              type="text"
              required
              onChange={handleChange}
              value={formData.logradouro}
              placeholder='Ex: Rua Gian Carlo Denio Raquel'
            />
          </div>
          <div className='contentname_budgets1'>
            Número:
            <input
              name="numero"
              type="number"
              required
              onChange={handleChange}
              value={formData.numero}
              placeholder='Ex: 180'
            />
          </div>
        </div>

        <div className='namecontact_budgets'>
          <div className='contentname_budgets1'>
            Bairro:
            <input
              name="bairro"
              type="text"
              required
              onChange={handleChange}
              value={formData.bairro}
              placeholder='Ex: Bairro'
            />
          </div>
          <div className='contentname_budgets1'>
            Cidade:
            <input
              name="cidade"
              type="text"
              required
              onChange={handleChange}
              value={formData.cidade}
              placeholder='Ex: Chapecó'
            />
          </div>
          <div className='contentname_budgets1'>
            UF:
            <input
              name="uf"
              type="text"
              required
              onChange={handleChange}
              value={formData.uf}
              placeholder='Ex: SC'
            />
          </div>
          <div className='contentname_budgets1'>
            CEP:
            <input
              name="cep"
              type="number"
              required
              onChange={handleChange}
              value={formData.cep}
              placeholder='Ex: 89801'
            />
          </div>
        </div>

        <div className='namecontact_budgets'>
          <div className='contentmedidas_budgets'>
            Medida altura:
            <input
              name="altura"
              type="text"
              required
              onChange={handleChange}
              value={formData.altura}
              placeholder='Ex: 4.5'
            />
          </div>
          <div className='contentmedidas_budgets'>
            Medida comprimento:
            <input
              name="comprimento"
              type="text"
              required
              onChange={handleChange}
              value={formData.comprimento}
              placeholder='Ex: 3.2'
            />
          </div>
        </div>

        <button id='submitbudget_button' type="submit">Gerar orçamento</button>
      </form>
    </div>
  );
}

export default Orcamentos;
