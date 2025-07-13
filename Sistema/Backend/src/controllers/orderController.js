import orderModel from "../model/orderModel.js";
import addressModel from "../model/addressModel.js";
import db from '../config/database.js';

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

// // Função para atualizar um pedido
// export const updateOrder = async (req, res) => {
//   try {
//     const { codped } = req.params;
//     const updates = req.body;
//     const endereçoAntigo = null;

//     if (!updates || Object.keys(updates).length === 0) {
//       return res.status(400).json({ message: 'Nenhum campo para atualizar.' });
//     }

//     // Atualizar endereço, se necessário
//     if (updates.enderped && typeof updates.enderped === 'object' && Object.keys(updates.enderped).length > 0) {
//       // armazenar o endereço antigo
      
      
//       const order = await orderModel.getOrderById(codped);
//       if (!order) {
//         return res.status(404).json({ message: 'Pedido não encontrado.' });
//       }

//       const endereçoAntigo = order.enderped;

//       const updatedAddress = await addressModel.updateAddress(order.enderped, updates.enderped);
//       if (updatedAddress.error) {
//         return res.status(404).json({ error: updatedAddress.error });
//       }
//       updates.enderped = updatedAddress.endercod;
//     }

//     // deleta o endereço antigo se ele foi atualizado
//     if (endereçoAntigo && endereçoAntigo !== updatedAddress.endercod) {
//       const deletedAddress = await addressModel.deleteAddress(endereçoAntigo);
//       if (deletedAddress.error) {
//         return res.status(404).json({ error: deletedAddress.error });
//       }
//     }

//     res.status(200).json(updateOrder);
//   } catch (error) {
//     console.error('Erro ao atualizar pedido:', error.message);
//     res.status(500).json({ error: 'Erro ao atualizar pedido.' });
//   }
// };

export const updateOrder = async (req, res) => {
  try {
    const { codped } = req.params;
    const updates = req.body;
    let enderecoAntigo = null;
    let updatedAddress = null;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Nenhum campo para atualizar.' });
    }

    // Atualizar endereço, se necessário
    if (updates.enderped && typeof updates.enderped === 'object' && Object.keys(updates.enderped).length > 0) {
      const order = await orderModel.getOrderById(codped);
      if (!order || order.error) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
      }

      enderecoAntigo = order.enderped;

      updatedAddress = await addressModel.updateAddress(order.enderped, updates.enderped);
      if (updatedAddress.error) {
        return res.status(404).json({ error: updatedAddress.error });
      }

      updates.enderped = updatedAddress.endercod;
    }

    // Atualizar o pedido no banco
    const pedidoAtualizado = await orderModel.updateOrder(codped, updates);
    if (pedidoAtualizado.error) {
      return res.status(404).json({ error: pedidoAtualizado.error });
    }

    // Deletar endereço antigo se foi alterado
    if (enderecoAntigo && updatedAddress && enderecoAntigo !== updatedAddress.endercod) {
      const deletedAddress = await addressModel.deleteAddress(enderecoAntigo);
      if (deletedAddress.error) {
        return res.status(404).json({ error: deletedAddress.error });
      }
    }

    res.status(200).json({ mensagem: 'Atualizado com sucesso', pedido: pedidoAtualizado || null });

  } catch (error) {
    console.error('Erro ao atualizar pedido:', error.message);
    return res.status(500).json({ error: 'Erro ao atualizar pedido.' });
  }
};

export const getPedidosPorMes = async (req, res) => {
  try {
    const dados = await orderModel.getPedidosPorMes();
    res.status(200).json(dados);
  } catch (error) {
    console.error('Erro ao buscar pedidos por mês:', error.message);
    res.status(500).json({ error: 'Erro ao buscar pedidos por mês.' });
  }
};

export const getPieChartData = async (req, res) => {
  try {
    const data = await orderModel.getPieChartData();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar dados para gráfico de pizza:", error.message);
    res.status(500).json({ error: "Erro ao buscar dados para gráfico de pizza." });
  }
};



import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

const pgp = pgPromise();

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const dbTx = pgp(connectionString);

export const createOrcamento = async (req, res) => {
  const {
    nome,
    cpf,
    telefone,
    email,
    dataPedido,
    logradouro,
    numero,
    bairro,
    cidade,
    uf,
    cep,
    altura,
    comprimento
  } = req.body;

  try {
    await dbTx.tx(async t => {
      // 1. Inserir endereço, sempre com complemento 'casa'
      const insertEndereco = `
        INSERT INTO endereco (lgdr, numero, bairro, cidade, estado, cep, complmt)
        VALUES ($1, $2, $3, $4, $5, $6, 'casa')
        RETURNING endercod
      `;
      const enderecoResult = await t.one(insertEndereco, [logradouro, numero, bairro, cidade, uf, cep]);
      const enderecoId = enderecoResult.endercod;

      // 2. Inserir cliente
      const insertCliente = `
        INSERT INTO cliente (cpf, nome, fone, email, endercli)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await t.none(insertCliente, [cpf, nome, telefone, email, enderecoId]);

      // 3. Calcular valor do pedido
      const valped = parseFloat(altura) * parseFloat(comprimento);

      // 4. Inserir pedido
      const insertPedido = `
        INSERT INTO pedido (cliente, statped, valped, comp, altura, dtpdd, enderped)
        VALUES ($1, 'espera', $2, $3, $4, $5, $6)
      `;
      await t.none(insertPedido, [cpf, valped, comprimento, altura, dataPedido, enderecoId]);
    });

    res.status(201).json({ message: 'Orçamento criado com sucesso!' });

  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    res.status(500).json({ error: 'Erro interno ao criar orçamento' });
  }
};