import db from '../config/database.js';


// Função para inserir um novo instalador no banco de dados
const insertInstaller = async (installer) => {
  try {
    const {cpf, nome, email, fone, habilit } = installer;
    console.log('Inserindo instalador:', installer);
    const result = await db.query(
      'INSERT INTO instalador (cpf, nome, email, fone, habilit) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [cpf, nome, email, fone, habilit]
    );
    return result[0];
  } catch (error) {
    console.error('Erro ao inserir instalador:', error.message);
    throw error;
  }
}

// Função para listar todos os instaladores
const getAllInstallers = async () => {
  try {
    console.log('Iniciando consulta ao banco...');
    const rows = await db.query('SELECT * FROM instalador ORDER BY nome ASC');
    console.log('Consulta finalizada:', rows);
    if (!rows || rows.length === 0) {
      return { error: 'Nenhum resultado encontrado.' };
    }
    return rows; // <-- movido para dentro do try
  } catch (error) {
    console.error('Erro ao buscar instaladores:', error.message);
    return { error: 'Erro ao buscar instaladores.' };
  }
}

// Função para atualizar instalador dinamicamente
const updateInstaller = async (cpf, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) {
    throw new Error('Nenhum campo para atualizar.');
  }

  const setString = fields.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
  const query = `UPDATE instalador SET ${setString} WHERE cpf = $${fields.length + 1} RETURNING *`;

  try {
    const result = await db.query(query, [...values, cpf]);
    return result[0];
  } catch (error) {
    console.error('Erro ao atualizar instalador:', error.message);
    throw error;
  }
}

// Função para buscar instalador por cpf
const getInstallerByCpf = async (cpf) => {
  try {
    const result = await db.query('SELECT * FROM instalador WHERE cpf = $1', [cpf]);
    return result[0] || null;
  } catch (error) {
    console.error('Erro ao buscar instalador por CPF:', error.message);
    throw error;
  }
}

// Função para deletar instalador
const deleteInstaller = async (cpf) => {
  try {
    const result = await db.query('DELETE FROM instalador WHERE cpf = $1 RETURNING *', [cpf]);
    return result[0];
  } catch (error) {
    console.error('Erro ao deletar instalador:', error.message);
    throw error;
  }
}

export default {
  insertInstaller,
  getAllInstallers,
  updateInstaller,
  getInstallerByCpf,
  deleteInstaller
};