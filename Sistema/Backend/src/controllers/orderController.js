import orderModel from "../model/orderModel.js";
import addressModel from "../model/addressModel.js";

/* * Controlador para gerenciar pedidos
{
    cliente : cpf,
    statped : status do pedido,
    valped : valor do pedido,
    comp : comprimento do pedido,
    altura : altura do pedido,
    enderped : {
        cep : cep do pedido,
        logradouro : logradouro do pedido,
        numero : numero do pedido,
        bairro : bairro do pedido,
        cidade : cidade do pedido,
        uf : uf do pedido
    }
    pecas : [{
            nome : id da peça,
            quantidade : quantidade da peça,
        },
        {        
            nome : id da peça,
            quantidade : quantidade da peça,
        },
        ...
    ]
};
 */


// Função para inserir um novo pedido
export const createOrder = async (req, res) => {
  try {
    const { cliente, statped, valped, comp, altura, enderped, pecas } = req.body;
    
    const newAddress = await addressModel.insertAddress(enderped);

    const order = {
      cliente,
      statped,
      valped,
      comp,
      altura,
      enderped: newAddress.endercod, // Endereço inserido no banco
    };

    const newOrder = await orderModel.insertOrder(order);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Erro ao inserir pedido:', error.message);
 
    res.status(500).json({ error: 'Erro ao inserir pedido.' });
  }
}

export const getOrderById = async (req, res) => {
  try {
    const { codped } = req.params;
    const order = await orderModel.getOrderById(codped);
    if (order.error) {
      return res.status(404).json({ error: order.error });  
    }
    const orderItems = await orderItemModel.getOrderItemsByOrderId(codped);
    if (orderItems.error) {
      return res.status(404).json({ error: orderItems.error });
    }
    order.pecas = orderItems; // Adiciona os itens do pedido ao objeto
    res.status(200).json(order);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error.message);
    res.status(500).json({ error: 'Erro ao buscar pedido.' });
  }
}

// Função para buscar todos os pedidos
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    if (orders.error) {
      return res.status(404).json({ error: orders.error });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error.message);
    res.status(500).json({ error: 'Erro ao buscar pedidos.' });
  }
}

export const getAllOrdersCerto = async (req, res) => {
  try {
    const result = await orderModel.getAllOrdersCerto(); // ou onde você busca os dados
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar pedidos detalhados:", error.message);
    res.status(500).json({ error: "Erro interno ao buscar pedidos." });
  }
};

export const getOrdersPendentes = async (req, res) => {
  try {
    const result = await orderModel.getOrdersPendentes(); // ou onde você busca os dados
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar pedidos detalhados:", error.message);
    res.status(500).json({ error: "Erro interno ao buscar pedidos." });
  }
};

export const getOrdersConcluidas = async (req, res) => {
  try {
    const result = await orderModel.getOrdersConcluidas(); // ou onde você busca os dados
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar pedidos detalhados:", error.message);
    res.status(500).json({ error: "Erro interno ao buscar pedidos." });
  }
};

export const getOrdersProducao = async (req, res) => {
  try {
    const result = await orderModel.getOrdersProducao(); // ou onde você busca os dados
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar pedidos detalhados:", error.message);
    res.status(500).json({ error: "Erro interno ao buscar pedidos." });
  }
};

// Função para deletar um pedido
export const deleteOrder = async (req, res) => {
  try {
    const { codped } = req.params;
    // Deletar os itens do pedido antes de deletar o pedido
    // const deletedItems = await orderItemModel.deleteOrderItem(codped);
    // if (deletedItems.error) {
    //   return res.status(404).json({ error: deletedItems.error });
    // }
    // Deletar o pedido 
    
    const deletedOrder = await orderModel.deleteOrder(codped);
    if (deletedOrder.error) {
      return res.status(404).json({ error: deletedOrder.error });
    }
    res.status(200).json(deletedOrder);
  } catch (error) {
    console.error('Erro ao deletar pedido:', error.message);
    res.status(500).json({ error: 'Erro ao deletar pedido.' });
  }
}

// Função para atualizar um pedido
export const updateOrder = async (req, res) => {
  try {
    const { codped } = req.params;
    const updates = req.body;
    const endereçoAntigo = null;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Nenhum campo para atualizar.' });
    }

    // Atualizar endereço, se necessário
    if (updates.enderped && typeof updates.enderped === 'object' && Object.keys(updates.enderped).length > 0) {
      // armazenar o endereço antigo
      
      
      const order = await orderModel.getOrderById(codped);
      if (!order) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
      }

      const endereçoAntigo = order.enderped;

      const updatedAddress = await addressModel.updateAddress(order.enderped, updates.enderped);
      if (updatedAddress.error) {
        return res.status(404).json({ error: updatedAddress.error });
      }
      updates.enderped = updatedAddress.endercod;
    }

    // deleta o endereço antigo se ele foi atualizado
    if (endereçoAntigo && endereçoAntigo !== updatedAddress.endercod) {
      const deletedAddress = await addressModel.deleteAddress(endereçoAntigo);
      if (deletedAddress.error) {
        return res.status(404).json({ error: deletedAddress.error });
      }
    }

    res.status(200).json(updateOrder);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar pedido.' });
  }
};
