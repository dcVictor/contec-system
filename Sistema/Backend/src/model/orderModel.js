import db from '../config/database.js';

// Função que faz inserção de um novo pedido no banco
const insertOrder = async (order) => {
  try {
    const { cliente, statped, valped, comp, altura, enderped} = order;
    const result = await db.query(
      'INSERT INTO pedido (cliente, statped, valped, comp, altura, enderped) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [cliente, statped, valped, comp, altura, enderped]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao inserir pedido:', error.message);
    throw error;
  }
};

// Função que busca todos os pedidos no banco
const getAllOrders = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query('SELECT * FROM pedido ORDER BY codped ASC');
    console.log('Consulta finalizada:', rows);
    if (!rows) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error.message);
    return { error: 'Erro ao buscar pedidos.' };
  }
};



// Função que busca todos os pedidos no banco
const getAllOrdersCerto = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query('SELECT p.codped, p.statped, p.dtpdd, p.valped, p.comp, p.altura, c.nome, e.cidade, e.estado  FROM pedido p JOIN cliente c on p.cliente = c.cpf JOIN endereco e ON c.endercli = e.endercod ORDER BY codped ASC');
    console.log('Consulta finalizada:', rows);
    if (!rows) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error.message);
    return { error: 'Erro ao buscar pedidos.' };
  }
};

// Função que busca todos os pedidos no banco

const getOrdersPendentes = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query(`SELECT p.codped, p.statped, p.dtpdd, p.valped, p.comp, p.altura, c.nome, e.cidade, e.estado  FROM pedido p JOIN cliente c on p.cliente = c.cpf JOIN endereco e ON c.endercli = e.endercod WHERE p.statped = 'espera' ORDER BY codped ASC`);
    console.log('Consulta finalizada:', rows);
    if (!rows) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error.message);
    return { error: 'Erro ao buscar pedidos.' };
  }
};

const getOrdersConcluidas = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query(`SELECT p.codped, p.statped, p.dtpdd, p.valped, p.comp, p.altura, c.nome, e.cidade, e.estado  FROM pedido p JOIN cliente c on p.cliente = c.cpf JOIN endereco e ON c.endercli = e.endercod WHERE p.statped = 'instalado' ORDER BY codped ASC`);
    console.log('Consulta finalizada:', rows);
    if (!rows) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error.message);
    return { error: 'Erro ao buscar pedidos.' };
  }
};

const getOrdersProducao = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query(`SELECT p.codped, p.statped, p.dtpdd, p.valped, p.comp, p.altura, c.nome, e.cidade, e.estado  FROM pedido p JOIN cliente c on p.cliente = c.cpf JOIN endereco e ON c.endercli = e.endercod WHERE p.statped = 'pedido' ORDER BY codped ASC`);
    console.log('Consulta finalizada:', rows);
    if (!rows) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error.message);
    return { error: 'Erro ao buscar pedidos.' };
  }
};

// Função que busca um pedido pelo código
const getOrderById = async (codped) => {
  try {
    const result = await db.query('SELECT * FROM pedido WHERE codped = $1', [codped]);
    if (result.length === 0) {
      return { error: 'Pedido não encontrado.' };
    }
    return result[0];
  } catch (error) {
    console.error('Erro ao buscar pedido:', error.message);
    throw error;
  }
};



// Função para atualizar o pedido dinamicamente
// const updateOrder = async (codped, updates) => {
//   const fields = Object.keys(updates);
//   const values = Object.values(updates);  
//   if (fields.length === 0) {
//     throw new Error('Nenhum campo para atualizar.');
//   }
//   const setString = fields.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
//   const query = `UPDATE pedido SET ${setString} WHERE codped = $${fields.length + 1} RETURNING *`;
//   try {
//     const result = await db.query(query, [...values, codped]);
//     if (result.length === 0) {
//       return { error: 'Pedido não encontrado.' };
//     }
//     return result[0];
//   } catch (error) {
//     console.error('Erro ao atualizar pedido:', error.message);
//     throw error;
//   }
// };

const updateOrder = async (codped, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) {
    throw new Error('Nenhum campo para atualizar.');
  }

  const setString = fields.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
  const query = `UPDATE pedido SET ${setString} WHERE codped = $${fields.length + 1} RETURNING *`;

  try {
    const result = await db.query(query, [...values, codped]);

    console.log("Resultado da query UPDATE:", result); // 🔍 debug

    if (!result || !result.rows || result.rows.length === 0) {
      return { error: 'Pedido não encontrado ou não atualizado.' };
    }

    return result.rows[0];
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    throw error;
  }
};


// Função que deleta um pedido pelo código
const deleteOrder = async (codped) => {
  try {
    const result = await db.query('DELETE FROM pedido WHERE codped = $1 RETURNING *', [codped]);
    if (result.length === 0) {
      return { error: 'Pedido não encontrado.' };
    }
    return result[0];
  } catch (error) {
    console.error('Erro ao deletar pedido:', error.message);
    throw error;
  }
};


const getPedidosPorMes = async () => {
  try {
    const query = `
      SELECT
        TO_CHAR(dtpdd, 'FMMonth') AS "Serviços", -- FM para tirar espaços extras no mês
        COUNT(*) AS "Pedidos"
      FROM pedido
      GROUP BY TO_CHAR(dtpdd, 'FMMonth'), EXTRACT(MONTH FROM dtpdd)
      ORDER BY EXTRACT(MONTH FROM dtpdd);
    `;
    const result = await db.query(query);
    // Se result for um array, retorna direto. Se for objeto com rows, retorna rows
    return Array.isArray(result) ? result : result.rows;
  } catch (error) {
    console.error('Erro ao buscar pedidos por mês:', error);
    throw error;
  }
};

const getPieChartData = async () => {
  try {
    const query = `
      SELECT tipserv AS id, tipserv AS label, COUNT(*) AS value
      FROM servico
      GROUP BY tipserv
      UNION ALL
      SELECT 'Pedidos' AS id, 'Total pedidos vendidos' AS label, COUNT(*) AS value
      FROM pedido
    `;
    const result = await db.query(query);
    return result.map(row => ({
      ...row,
      value: parseInt(row.value, 10)
    }));
  } catch (error) {
    console.error("Erro ao buscar dados para gráfico de pizza:", error);
    throw error;
  }
};



export default {
  insertOrder,
  getAllOrders,
  getPedidosPorMes,
  getPieChartData,
  getOrdersConcluidas,
  getOrdersPendentes,
  getOrdersProducao,
  getAllOrdersCerto,
  getOrderById,
  deleteOrder,
  updateOrder 
};