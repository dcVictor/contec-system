# ContecSis

Sistema de Gestão de Clientes, Pedidos, Serviços, Instaladores, Peças e Usuários

-  Universidade Federal da Fronteira Sul (UFFS)
-  Ciência da Computação
- Alunos: 
  - Raiel Vitor Babinski 
  - Victor Neymar de Conto



## Sumário
- [ContecSis](#contecsis)
  - [Sumário](#sumário)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Frontend](#frontend)
  - [Backend](#backend)
    - [Como Rodar Backend](#como-rodar-backend)
      - [Banco de Dados](#banco-de-dados)
      - [Rodando o Servidor](#rodando-o-servidor)
    - [Documentação da API](#documentação-da-api)


---

## Sobre o Projeto

O ContecSis é um sistema para gestão da empresa Contec do segmento de portões automáticos, assistência técnica e serviços relacionados. O objetivo é por a prova os conhecimentos dos CCRs de Programação II, Banco de dados e Engenharia de Software.

## Frontend
- React
- Nivo
- Mui
- FullCallendar
- Vite

### Como Rodar Front-End
1. Entre na pasta contec-app

2. Execute npm install

3. Execute npm run dev

4. Pronto, seu front está rodando!


## Backend
- Node.js
- Express
- PostgreSQL
- pg-promise
- JWT (jsonwebtoken)
- dotenv
- cors
- passport

### Como Rodar Backend

#### Banco de Dados

1. Crie um banco de dados PostgreSQL.

2. Na pasta Database no arquivo `estrutura.sql`, localiza-se os comandos para a criação das tabelas no seu banco de dados PostgreSQL:
   
    [estrutura.sql](Sistema/Database/estrutura.sql)

3. Popule o banco de dados executando o script de inserts no seu banco de dados PostgreSQL:
  
    [dados.sql](Sistema/Database/dados.sql)

#### Rodando o Servidor

1. Navegue até a pasta `Sistema/Backend` e instale as dependências:
```bash
cd Sistema/Backend
```

2. Instale o Yarn caso não tenha instalado na sua máquina:
```bash
npm install -g yarn
```
3. Instale as dependências do projeto:
```bash
yarn install
```
4. Na pasta `Sistema/Backend`, crie um arquivo `.env` com as seguintes variáveis de ambiente:
```env
   DB_HOST=host_do_banco
   DB_PORT=porta_do_banco
   DB_NAME=seu_banco
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   JWT_SECRET=sua_chave_secreta
   PORT=sua_porta
   ```
Escreva as suas variaveis de ambiente conforme necessário.

6. Entre na pasta src:
```bash
cd src
```
7. Inicie o servidor:
```bash
node server.js
```


### Documentação da API
A documentação completa dos endpoints, exemplos de requisições e respostas, bodies esperados e erros comuns está disponível em `Sistema/Backend/README.md`.

