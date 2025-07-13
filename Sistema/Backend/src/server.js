import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from './config/database.js';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import installerRoutes from './routes/installerRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = 3002; // A porta onde a API vai rodar

app.use(express.json());
app.use(cors());

// Rotas principais
app.use('/user', userRoutes);

app.use('/cliente', clientRoutes);

app.use('/instalador', installerRoutes);

app.use('/servico', serviceRoutes);


app.use('/pedido', orderRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});

