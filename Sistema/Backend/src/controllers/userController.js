// Agora importamos do repositório, e não temos mais o array de tarefas aqui!
import userModel from '../model/userModel.js';
import passport, { requireJWTAuth } from '../config/passport.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Função para buscar todas as tarefas (GET)
export const getAllUsers = async (req, res) => {
  try {
    console.log('Buscando todos os usuários...');
    const users = await userModel.usersAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};
export const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // Mensagem personalizada de erro
      return res.status(401).json({ message: info?.message || 'Credenciais inválidas' });
    }
    // Gera o token JWT
    const token = jwt.sign(
      { username: user.nome }, // payload
      process.env.JWT_SECRET,       // mesmo segredo da sua estratégia JWT
      { expiresIn: '20h' }
    );
    // Retorna o token para o front
    return res.json({ token, user: { nome: user.nome } });
  })(req, res, next);
};

export const  createUser = async (req, res) => {
    try {
        const user = req.body;
        console.log('Criando usuário:', user);
        const userIncripted = {
            nome : user.nome,
            senha : await bcrypt.hash(user.senha, 10),
            email : user.email,
            telefone : user.telefone, 
            cargo : user.cargo
        };

        console.log('Usuário incriptado:', userIncripted);
        const newUser = await userModel.insertUser(userIncripted);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

// Função para retornar o usuário pelo nome
export const getUserByName = async (req, res) => {
  const { nome } = req.params;
  try {
    console.log(`Buscando usuário com nome ${nome}...`);
    const user = await userModel.getUserByName(nome);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

// Função para atualizar um usuário
export const updateUser = async (req, res) => {
  const { nome } = req.params;
  const updates = req.body;

  try {
    console.log(`Atualizando usuário com nome ${nome}...`);
    const updatedUser = await userModel.updateUser(nome, updates);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

// Função para deletar um usuário
export const deleteUser = async (req, res) => {
  const { nome } = req.params;

  try {
    console.log(`Deletando usuário com nome ${nome}...`);
    const deletedUser = await userModel.deleteUser(nome);
    if (deletedUser.error) {
      return res.status(404).json({ message: deletedUser.error });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}