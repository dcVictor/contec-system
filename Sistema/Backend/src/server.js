import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js'; // Assume que a configuração do passport está aqui
// import { Strategy as LocalStrategy } from 'passport-local'; // Não são mais necessários aqui se estiverem em passport.js
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'; // Idem
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from './config/database.js';
import dotenv from 'dotenv';

// Dependências necessárias para a lógica da catraca
import axios from 'axios';
import CryptoJS from 'crypto-js';

// Importação de Rotas
import userRoutes from './routes/userRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import installerRoutes from './routes/installerRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

// Configuração do Gemini AI
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
const PORT = process.env.PORT || 3002; // Usar variável de ambiente ou 3002

// --- Middlewares Essenciais ---

// Habilita CORS para todas as rotas
app.use(cors());

// Habilita o parsing de JSON no corpo das requisições
app.use(express.json());

// --- Configuração de Sessão e Passport (ADICIONADO) ---
// (Importante se o passport-local criar uma sessão antes de gerar o JWT)
app.use(session({
  // Mova o 'secret' para seu arquivo .env
  secret: process.env.SESSION_SECRET || 'um_secret_muito_seguro_para_fallback',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' } // 'true' em produção (HTTPS)
}));

// Inicializa o Passport
app.use(passport.initialize());
// Habilita sessões do Passport (se usadas)
app.use(passport.session());


// --- Lógica de Autenticação Digest (ADICIONADA) ---
// (Movida do frontend para o backend)
async function fazerChamadaDigest(url, options) {
  const { method = 'GET', username, password } = options;

  try {
    await axios({ method, url });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const authHeader = error.response.headers['www-authenticate'];
      if (!authHeader) {
        throw new Error('O servidor não enviou o desafio WWW-Authenticate.');
      }

      const digestParams = {};
      authHeader.replace(/(\w+)="([^"]*)"/g, (match, key, value) => {
        digestParams[key] = value;
      });

      const { realm, nonce, qop } = digestParams;
      const cnonce = CryptoJS.lib.WordArray.random(8).toString();
      const nc = '00000001';
      const path = new URL(url).pathname + new URL(url).search;

      const HA1 = CryptoJS.MD5(`${username}:${realm}:${password}`).toString();
      const HA2 = CryptoJS.MD5(`${method}:${path}`).toString();
      const responseHash = CryptoJS.MD5(`${HA1}:${nonce}:${nc}:${cnonce}:${qop}:${HA2}`).toString();

      const authorization = `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${path}", qop=${qop}, nc=${nc}, cnonce="${cnonce}", response="${responseHash}"`;

      return axios({
        method,
        url,
        headers: { 'Authorization': authorization },
      });
    }
    throw error;
  }
}


// --- Rotas da API ---

// Endpoint do Gemini
app.post('/gemini-chat', async (req, res, next) => { // Adicionado 'next'
  const userMessage = req.body.message;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(userMessage);
    const text = result.response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error("Erro no Gemini:", error);
    next(error); // Passa o erro para o handler global
  }
});

// Endpoint para Controle de Acesso (Catracas) (ADICIONADO)
app.post('/api/abrir-porta', async (req, res, next) => { // Adicionado 'next'
  const { idCatraca } = req.body;

  // Mapeamento de dispositivos. 
  // O ideal é que senhas fiquem no .env e não no código.
  const dispositivos = {
    'catraca1': { ip: '192.168.14.7', user: 'admin', pass: 'Admti89@' },
    'catraca2': { ip: '192.168.14.5', user: 'admin', pass: 'Admti89@' },
    'catraca3': { ip: '192.168.14.3', user: 'admin', pass: 'Admti89@' },
    'catraca4': { ip: '192.168.14.6', user: 'admin', pass: 'Admti89@' },
    'catraca5': { ip: '192.168.16.55', user: 'admin', pass: 'Admti89@' },
    'catraca6': { ip: '192.168.16.54', user: 'admin', pass: 'Admti89@' },
    'catraca7': { ip: '192.168.9.150', user: 'admin', pass: 'Admti89@' }
    // Adicione mais dispositivos conforme necessário
  };

  const dispositivo = dispositivos[idCatraca];
  if (!dispositivo) {
    // Retorna um erro 404 se a catraca não for encontrada
    return res.status(404).json({ message: 'Dispositivo (catraca) não encontrado' });
  }

  try {
    const url = `http://${dispositivo.ip}/cgi-bin/accessControl.cgi?action=openDoor&channel=1`;
    const response = await fazerChamadaDigest(url, {
      username: dispositivo.user,
      password: dispositivo.pass,
      method: 'GET'
    });
    res.json({ message: 'Comando enviado com sucesso', data: response.data });
  } catch (error) {
    console.error(`Erro ao comunicar com a catraca ${idCatraca}:`, error.message);
    // Passa o erro para o handler global
    next(new Error(`Falha ao comunicar com a catraca ${idCatraca}`));
  }
});


// Rotas de Entidades (Montadas)
app.use('/user', userRoutes);
app.use('/cliente', clientRoutes);
app.use('/instalador', installerRoutes);
app.use('/servico', serviceRoutes);
app.use('/pedido', orderRoutes);


// --- Handler de Erro Global (ADICIONADO) ---
// (Deve ser o ÚLTIMO 'app.use')
app.use((err, req, res, next) => {
  console.error(err.stack); // Loga o erro no console do servidor

  // Envia uma resposta de erro padronizada
  res.status(err.status || 500).json({ 
    error: {
      message: err.message || 'Ocorreu um erro interno no servidor.'
    }
  });
});


// --- Inicialização do Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
