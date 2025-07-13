import db from '../config/database.js';

// Função para inserir um novo cliente no banco de dados
const insertClient = async (client) => {
  try {
    const { cpf, nome, fone, emai, enderCli } = client;
    console.log('Inserindo cliente:', client);
    const result = await db.query(
      'INSERT INTO cliente (cpf, nome, fone, email, enderCli) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [cpf, nome, fone, emai, enderCli]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao inserir cliente:', error.message);
    throw error;
  }
};

// Função para listar todos os clientes
const getAllClients = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query('SELECT * FROM cliente ORDER BY nome ASC');
    console.log('Consulta finalizada:', rows);
    if (!rows || rows.length === 0) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows; // <-- movido para dentro do try
  } catch (error) {
    console.error('Erro ao buscar clientes:', error.message);
    return { error: 'Erro ao buscar clientes.' };
  }
};

const getAllClientsCerto = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query('SELECT c.cpf, c.nome, c.email, c.fone, e.lgdr, e.numero, e.bairro, e.cidade, e.estado, e.cep FROM cliente c JOIN endereco e ON endercli = endercod ORDER BY nome ASC');
    console.log('Consulta finalizada:', rows);
    if (!rows || rows.length === 0) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows; // <-- movido para dentro do try
  } catch (error) {
    console.error('Erro ao buscar clientes:', error.message);
    return { error: 'Erro ao buscar clientes.' };
  }
};

// Função para atualizar cliente dinamicamente
const updateClient = async (cpf, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) {
    throw new Error('Nenhum campo para atualizar.');
  }

  const setString = fields.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
  const query = `UPDATE cliente SET ${setString} WHERE cpf = $${fields.length + 1} RETURNING *`;

  try {
    const result = await db.query(query, [...values, cpf]);
    return result[0];
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error.message);
    throw error;
  }
};

const getClientByCpf = async (cpf) => {
  try {
    const result = await db.query('SELECT * FROM cliente WHERE cpf = $1', [cpf]);
    return result[0] || null;
  } catch (error) {
    console.error('Erro ao buscar cliente por CPF:', error.message);
    throw error;
  }
};

const deleteClient = async (cpf) => {
  try {
    const result = await db.query('DELETE FROM cliente WHERE cpf = $1 RETURNING * ', [cpf]);
    if (result.length === 0) {
        return { error: 'Cliente não encontrado.' };
    }
    return result[0];
  } catch (error) {
    console.error('Erro ao deletar cliente:', error.message);
    throw error;
  }
};

export default {
    deleteClient,
    updateClient,
    getAllClientsCerto,
    insertClient,
    getAllClients,
    getClientByCpf
};