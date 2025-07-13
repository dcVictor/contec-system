import clientModel from '../model/clientModel.js';
import addressModel from '../model/addressModel.js';

// Função para inserir um novo cliente 
export const createClient = async (req, res) => {
  try {
    const { cpf, nome, fone, emai, enderCli } = req.body;
      
    const newAddress = await addressModel.insertAddress(enderCli);

    console.log('Endereço inserido:', newAddress);

    const newClient = await clientModel.insertClient({
      cpf,
      nome,
      fone,
      emai,
      enderCli: newAddress.endercod 
    });

    res.status(201).json(newClient);
  } catch (error) {
    console.error('Erro ao inserir cliente:', error.message);
    res.status(500).json({ message: 'Erro ao inserir cliente.' });
  }
};

// Função para listar todos os clientes
export const getAllClients = async (req, res) => {
  try {
    console.log('Buscando todos os clientes...');
    const clients = await clientModel.getAllClients();
    if (clients.error) {
      return res.status(404).json({ message: clients.error });
    }
    res.status(200).json(clients);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const getAllClientsCerto = async (req, res) => {
  try {
    console.log('Buscando todos os clientes...');
    const clients = await clientModel.getAllClientsCerto();
    if (clients.error) {
      return res.status(404).json({ message: clients.error });
    }
    res.status(200).json(clients);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { cpf } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Nenhum campo para atualizar.' });
    }

    // Se houver campos de endereço no body, atualize o endereço
    if (updates.enderCli && typeof updates.enderCli === 'object' && Object.keys(updates.enderCli).length > 0) {
      // Primeiro, obtenha o cliente para pegar o código do endereço
      const client = await clientModel.getClientByCpf(cpf);
      
      if (!client) {
        return res.status(404).json({ message: 'Cliente não encontrado.' });
      }
      // Atualize o endereço
      await addressModel.updateAddress(client.endercli || client.enderCli, updates.enderCli);
      console.log('Endereço atualizado com sucesso.');
      // Remova enderCli do updates para não tentar atualizar na tabela cliente
      delete updates.enderCli;
    }

    // Atualize o cliente (se houver outros campos além do endereço)
    let updatedClient = null;
    if (Object.keys(updates).length > 0) {
      updatedClient = await clientModel.updateClient(cpf, updates);
      if (!updatedClient) {
        return res.status(404).json({ message: 'Cliente não encontrado.' });
      }
    } else {
      // Se só atualizou endereço, retorne o cliente atual
      updatedClient = await clientModel.getClientByCpf(cpf);
    }

    res.json(updatedClient);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar cliente.' });
  }

};

export const getClientByCpf = async (req, res) => {
  try {
    const { cpf } = req.params;
    const client = await clientModel.getClientByCpf(cpf);
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Erro ao buscar cliente por CPF:', error.message);
    res.status(500).json({ message: 'Erro ao buscar cliente.' });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { cpf } = req.params;

    // Primeiro, busca o cliente para pegar o código do endereço
    const client = await clientModel.getClientByCpf(cpf);
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    // Deleta o cliente
    const deletedClient = await clientModel.deleteClient(cpf);

    // Depois, deleta o endereço associado (se existir)
    if (client.endercli || client.enderCli) {
      await addressModel.deleteAddress(client.endercli || client.enderCli);
    }

    res.status(200).json(deletedClient);
  } catch (error) {
    console.error('Erro ao deletar cliente:', error.message);
    res.status(500).json({ message: 'Erro ao deletar cliente.' });
  }
};