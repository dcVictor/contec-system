import db from '../config/database.js';

// Função para inserir um novo endereço no banco de dados
const insertAddress = async (address) => {
  try {
    const { lgdr, numero, complmt, bairro, cidade, estado, cep } = address;
    const result = await db.query(
      'INSERT INTO endereco (lgdr, numero, complmt, bairro, cidade, estado, cep) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [lgdr, numero, complmt, bairro, cidade, estado, cep]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao inserir endereço:', error.message);
    throw error;
  }
};

const updateAddress = async (enderCod, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) {
    throw new Error('Nenhum campo para atualizar.');
  }

  const setString = fields.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
  const query = `UPDATE endereco SET ${setString} WHERE endercod = $${fields.length + 1} RETURNING *`;

  try {
    const result = await db.query(query, [...values, enderCod]);
    return result[0];
  } catch (error) {
    console.error('Erro ao atualizar endereço:', error.message);
    throw error;
  }
};

const deleteAddress = async (enderCod) => {
  try {
    const result = await db.query('DELETE FROM endereco WHERE endercod = $1 RETURNING *', [enderCod]);
    return result[0];
  } catch (error) {
    console.error('Erro ao deletar endereço:', error.message);
    throw error;
  }
};  

const getAddressById = async (enderCod) => {
  try {
    const result = await db.query('SELECT * FROM endereco WHERE endercod = $1', [enderCod]);
    if (result.length === 0) {
      return { error: 'Endereço não encontrado.' };
    }
    return result[0];
  } catch (error) {
    console.error('Erro ao buscar endereço:', error.message);
    throw error;
  }
};

export default {
    deleteAddress,
    insertAddress,
    updateAddress,
    getAddressById
};