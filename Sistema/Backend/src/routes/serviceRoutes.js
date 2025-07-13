import { createService, getAllServices, updateService, deleteService } from '../controllers/serviceController.js';
import express from 'express';
import { requireJWTAuth } from '../config/passport.js';

const router = express.Router();

// Rota para criar um novo serviço
router.post('/create', requireJWTAuth, createService);

// Rota para listar todos os serviços
router.get('/getall', requireJWTAuth, getAllServices);

// Rota para atualizar um serviço
router.put('/update/:codserv', requireJWTAuth, updateService);

// Rota para deletar um serviço
router.delete('/delete/:codserv', requireJWTAuth, deleteService);

export default router;