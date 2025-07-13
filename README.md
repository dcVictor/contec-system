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
  - [Estrutura de Pastas](#estrutura-de-pastas)
  - [Frontend](#frontend)
  - [Backend](#backend)
    - [Como Rodar Backend](#como-rodar-backend)
    - [Documentação da API](#documentação-da-api)


---

## Sobre o Projeto

O ContecSis é um sistema para gestão da empresa Contec do segmento de portões automáticos, assistência técnica e serviços relacionados. O objetivo é por a prova os conhecimentos dos CCRs de Programação II, Banco de dados e Engenharia de Software.

## Estrutura de Pastas
```
 ...
```

## Frontend



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
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/ContecSis.git
   ```
2. Instale as dependências do backend:
   ```bash
   cd Sistema/Backend
   npm install
   ```
3. Configure o arquivo `.env` com as variáveis de ambiente:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=contec_db
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   JWT_SECRET=sua_chave_secreta
   PORT=3000
   ```

4. Faça o insert das tabelas no seu banco de dados PostgreSQL conforme os scripts em `Sistema/Database/estrutura.sql`:
    ```bash
    psql -U seu_usuario -d seubanco -f estrutura.sql
    ```

5. Popule o banco de dados com dados de exemplo usando `Sistema/Database/dados.sql`:
   ```bash
   psql -U seu_usuario -d seubanco -f dados.sql
   ```

6. Inicie o servidor:
   ```bash
   npm start
   ```

> Os scripts `estrutura.sql` e `dados.sql` estão em `Sistema/Database/` e já trazem toda a estrutura e dados de exemplo para testes e desenvolvimento.


### Documentação da API
A documentação completa dos endpoints, exemplos de requisições e respostas, bodies esperados e erros comuns está disponível em `Sistema/Backend/README.md`.

