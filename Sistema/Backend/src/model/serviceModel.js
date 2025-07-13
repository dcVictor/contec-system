import db from '../config/database.js'; 

// Função para cadastrar um novo seviço no banco de dados
const insertService = async (service) => {
  try {
    const { inst, valserv, tipserv, dtserv, codped } = service;
    const result = await db.query(
      'INSERT INTO servico (inst, valserv, tipserv, dtserv, codped) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [ inst, valserv, tipserv, dtserv, codped ]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao inserir serviço:', error.message);
    throw error;
  }
}

// Função para listar todos os serviços
const getAllServices = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query('SELECT * FROM servico ORDER BY inst ASC');
    console.log('Consulta finalizada:', rows);
    if (!rows || rows.length === 0) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows; // <-- movido para dentro do try
  } catch (error) {
    console.error('Erro ao buscar serviços:', error.message);
    return { error: 'Erro ao buscar serviços.' };
  }
};

// Função para atualizar serviço dinamicamente
const updateService = async (inst, updates) => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    if (fields.length === 0) {
        throw new Error('Nenhum campo para atualizar.');
    };
    const setString = fields.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
    const query = `UPDATE servico SET ${setString} WHERE codserv = $${fields.length + 1} RETURNING *`;
    try {
        const result = await db.query(query, [...values, inst]);
        return result[0];
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error.message);
        throw error;
    }
}

// Função para deletar serviço
const deleteService = async (codserv) => {
  try {
    const result = await db.query('DELETE FROM servico WHERE codserv = $1 RETURNING *', [codserv]);
    if (result.length === 0) {
      return { error: 'Serviço não encontrado.' };
    }
    return result[0];
  } catch (error) { 
    console.error('Erro ao deletar serviço:', error.message);
    throw error;
  }
};  

export default {
  insertService,
  getAllServices,
  updateService,
  deleteService,
}