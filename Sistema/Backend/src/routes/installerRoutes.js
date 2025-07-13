import express from 'express';
import { requireJWTAuth, blockInstalador } from '../config/passport.js';
import { createInstaller, getAllInstallers, updateInstaller, getInstallerByCpf, deleteInstaller } from '../controllers/installerController.js';


const router = express.Router();

// Rota para criar um novo cliente
router.post('/create', requireJWTAuth, blockInstalador, createInstaller);

// Rota para listar todos os instaladores
router.get('/getall', requireJWTAuth, blockInstalador, getAllInstallers);

// Rota para atualizar um instalador
router.put('/update/:cpf', requireJWTAuth, blockInstalador, updateInstaller);

// Rota para buscar um instalador por CPF
router.get('/get/:cpf', requireJWTAuth, blockInstalador, getInstallerByCpf);

// Rota para deletar um instalador
router.delete('/delete/:cpf', requireJWTAuth, blockInstalador, deleteInstaller);

export default router;