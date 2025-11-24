// src/config/database.js
import dotenv from 'dotenv';
dotenv.config();

import pgPromise from 'pg-promise';
const pgp = pgPromise();

const usuario = process.env.DB_USER;
const senha = process.env.DB_PASSWORD;    
const port = process.env.DB_PORT; 
const database = process.env.DB_DATABASE ; 

const db = pgp(`postgres://${usuario}:${senha}@192.168.0.121:${port}/${database}`);

db.connect()
  .then(obj => {
    obj.done(); // success, release connection
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  });


export default {
  query: (text, params) => db.any(text, params),
  oneOrNone: (text, params) => db.oneOrNone(text, params),
  one: (text, params) => db.one(text, params),
};