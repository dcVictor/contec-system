import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
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

dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)


const app = express();
const PORT = 3002; // A porta onde a API vai rodar



app.use(express.json());
app.use(cors());


app.post('/gemini-chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(userMessage);
    const text = result.response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Erro no Gemini:", error);
    res.status(500).json({ error: 'Erro ao processar sua solicitação.' });
  }});


app.use(passport.initialize());

// Rotas principais
app.use('/user', userRoutes);

app.use('/cliente', clientRoutes);

app.use('/instalador', installerRoutes);

app.use('/servico', serviceRoutes);


app.use('/pedido', orderRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});

