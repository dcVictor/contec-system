import express from 'express';
import {createUser, getAllUsers, login, getUserByName, updateUser, deleteUser} from '../controllers/userController.js';
import { blockInstalador, requireJWTAuth } from '../config/passport.js';

const router = express.Router();

router.post('/login', login);

router.post('/create', requireJWTAuth, blockInstalador, createUser);

router.get('/getall', requireJWTAuth, blockInstalador, getAllUsers);

router.get('/get/:nome', requireJWTAuth, blockInstalador, getUserByName);

router.put('/update/:nome', requireJWTAuth, blockInstalador, updateUser);

router.delete('/delete/:nome', requireJWTAuth, blockInstalador, deleteUser);


export default router;