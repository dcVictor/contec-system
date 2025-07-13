import express from 'express';
import { createClient, getAllClients, updateClient, getClientByCpf, deleteClient, getAllClientsCerto } from '../controllers/clientController.js';
import { requireJWTAuth, blockInstalador } from '../config/passport.js';

const router = express.Router();

// Rota para criar um novo cliente
router.post('/create', requireJWTAuth, blockInstalador,  createClient);

// Rota para listar todos os clientes
router.get('/getall', requireJWTAuth, blockInstalador, getAllClients);

router.get('/getallcerto', getAllClientsCerto);

// Rota para buscar um cliente por CPF
router.get('/get/:cpf', requireJWTAuth, blockInstalador, getClientByCpf);

// Rota para atualizar um cliente
router.put('/update/:cpf', requireJWTAuth, blockInstalador, updateClient);

// Rota para deletar um cliente
router.delete('/delete/:cpf', requireJWTAuth, blockInstalador, deleteClient); 


export default router;