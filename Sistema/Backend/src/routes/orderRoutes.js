import { createOrder, getAllOrders, getAllOrdersCerto, deleteOrder, updateOrder, getOrderById, getOrdersPendentes, getOrdersConcluidas, getOrdersProducao  } from '../controllers/orderController.js';
import express from 'express';
import { requireJWTAuth } from '../config/passport.js';


const router = express.Router();

// Rota para criar um novo pedido
router.post('/create', requireJWTAuth, createOrder);

// Rota para buscar todos os pedidos
router.get('/getall', requireJWTAuth, getAllOrders); 

router.get('/getallcerto', requireJWTAuth, getAllOrdersCerto ); 

router.get('/getpendentes', requireJWTAuth, getOrdersPendentes ); 

router.get('/getconcluidos', requireJWTAuth, getOrdersConcluidas ); 

router.get('/getproducao', requireJWTAuth, getOrdersProducao ); 


// Rota para deletar um pedido pelo código
router.delete('/delete/:codped', requireJWTAuth, deleteOrder);  

// Rota para buscar um pedido pelo código
router.get('/get/:codped', requireJWTAuth, getOrderById);

// Rota para atualizar um pedido
router.put('/update/:codped', requireJWTAuth, updateOrder);

export default router;