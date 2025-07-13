import serviceModel from "../model/serviceModel.js";
import orderModel from "../model/orderModel.js";


// Função para inserir um novo serviço
export const createService = async (req, res) => {
  try {
    const service = req.body;
    const { codped } = service;

    // Verifica se o pedido existe antes de inserir o serviço
    const order = await orderModel.getOrderById(codped);
    if (order.error = 'Pedido não encontrado.') {
      return res.status(404).json({ message: 'Pedido (codped) não encontrado.' });
    }
    console.log('Inserindo serviço:', order);
   
    const newService = await serviceModel.insertService(service);
    res.status(201).json(newService);
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

// Função para listar todos os serviços
export const getAllServices = async (req, res) => {
  try {
    console.log('Buscando todos os serviços...');
    const services = await serviceModel.getAllServices();
    if (services.length === 0) {
      return res.status(404).json({ message: 'Nenhum serviço encontrado' });
    }
    res.status(200).json(services);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

// Função para atualizar um serviço
export const updateService = async (req, res) => {
  const { codserv } = req.params;
  const updates = req.body;

  try {
    console.log(`Atualizando serviço com inst ${codserv}...`);
    const updatedService = await serviceModel.updateService(codserv, updates);
    if (!updatedService) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

// Função para deletar serviço por id
export const deleteService = async (req, res) => {
  const { codserv } = req.params;
  console.log(`Tentando deletar serviço com codserv ${codserv}...`);
  try {
    console.log(`Deletando serviço com inst ${codserv}...`);
    const deletedService = await serviceModel.deleteService(codserv);
    if (!deletedService) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.status(200).json(deletedService);
  } catch (error) {
    console.error('Erro ao deletar serviço:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}