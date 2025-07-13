import db from '../config/database.js'; // Importa nossa conexão

// Função que busca todas as tarefas no banco
// src/model/userModel.js
const usersAll = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query('SELECT * FROM usuario ORDER BY codusuario ASC');
    console.log('Consulta finalizada:', rows);
    if (!rows) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.message);
    return { error: 'Erro ao buscar usuários.' };
  }
};

const insertUser = async (user) => {
  try {
    const { nome, senha, email, telefone, cargo } = user;
    const result = await db.query(
      'INSERT INTO usuario (nome, senha, email, telefone, cargo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, senha, email, telefone, cargo]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao inserir usuário:', error.message);
    throw error;
  }
};

const getUserByName = async (id) => {
  try {
    const result = await db.oneOrNone('SELECT * FROM usuario WHERE nome = $1', [id]);
    return result;
  } catch (error) {
    console.error('Erro ao buscar usuário por nome:', error.message);
    throw error;
  }
}


// Função que atualiza um usuário dinaminacamente
const updateUser = async (id, updates) => {
  try {
    const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = Object.values(updates);
    const query = `UPDATE usuario SET ${fields} WHERE codusuario = $${values.length + 1} RETURNING *`;
    console.log('Query de atualização:', query);
    const result  = await db.one(query, [...values, id]);
    return result;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error.message);
    throw error;
  }
};

// Função que deleta um usuário
const deleteUser = async (id) => {
  try {
    const result = await db.query('DELETE FROM usuario WHERE codusuario = $1 RETURNING *', [id]);
    if (result.length === 0) {
      return { error: 'Usuário não encontrado.' };
    }
    return result[0];
  } catch (error) {
    console.error('Erro ao deletar usuário:', error.message);
    throw error;
  }
};  

export default {
  usersAll,
  insertUser,
  getUserByName,
  updateUser,
  deleteUser
};