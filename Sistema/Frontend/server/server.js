const express = require("express");
const { body, validationResult, Result } = require('express-validator');
const pgp = require("pg-promise")({});
const cors = require("cors");
const bcrypt =require("bcrypt");
const saltRounds = 10;

const usuario = "postgres";
const senha = "postgres";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/postgres`);

const app = express();
app.use(express.json());
app.use(cors());

// busca os arquivos 'estáticos' na pasta 'public': JS e CSS
//app.use(express.static(__dirname + "/public"));

const PORT = 3002;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}.`));

app.post("/register", async (req, res) => {
  const { cracha, usuario, senha } = req.body;
  
  try {
    const existe = await db.oneOrNone("SELECT * FROM usuarios WHERE usuario = $1", [usuario]);

    if (existe) {
      return res.json({ msg: "Usuário já existente!" });
    }

    const hash = await bcrypt.hash(senha, saltRounds);

    await db.none("INSERT INTO usuarios (cracha, usuario, senha) VALUES ($1, $2, $3)", [cracha, usuario, hash]);

    res.json({ msg: "Cadastrado com sucesso!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao registrar usuário." });
  }
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.oneOrNone("SELECT * FROM usuarios WHERE usuario = $1", [username]);

    if (!user) {
      return res.status(401).json({ msg: "Usuário ou senha inválidos" });
    }

    const senhaCorreta = await bcrypt.compare(password, user.senha);

    if (senhaCorreta) {
      res.json({ msg: "Login bem-sucedido", username: user.usuario });
    } else {
      res.status(401).json({ msg: "Usuário ou senha inválidos" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no login." });
  }
});

/*app.get("/", (req, res) => {
  db.query("INSERT INTO usuarios (usuario, senha) VALUES ('teste', '1234')");
}); */


/*app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
}); */

app.get("/hello", (req, res) => {
  res.send("Hello, world!");
});

app.post("/hello", function (req, res) {
  const nome = req.body.nome;
  res.send(`Hello, ${nome}!`);
});

// app.get("/usuarios", async (req, res) => {
//   try {
//     const clientes = await db.any("SELECT * FROM usuarios;");
//     console.log("Retornando todos clientes.");
//     res.json(clientes).status(200);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(400);
//   }
// });

app.get("/usuario", async (req, res) => {
  try {
    const clientes = await db.any("SELECT * FROM usuario;");
    console.log("Retornando todos clientes.");
    res.json(clientes).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});


app.get("/cliente", async (req, res) => {
  try {
    const clienteId = parseInt(req.query.id);
    console.log(`Retornando ID: ${clienteId}.`);
    const clientes = await db.one(
      "SELECT id, nome, email FROM clientes WHERE id = $1;",
      clienteId
    );
    res.json(clientes).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.post("/cliente", [
        body('nome').isLength({ min: 3, max: 50 }),
        body('email').isLength({ min: 3, max: 50 }).isEmail()
    ], async (req, res) => {
  try {
    const nome = req.body.nome;
    const email = req.body.email;

    const novoCliente = await db.one(
      "INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING id, nome, email",
      [nome, email]
    );

    console.log(`Cliente criado: ID ${novoCliente.id}`);
    res.status(201).json(novoCliente);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.put("/cliente", async (req, res) => {
  try {
    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;

    await db.none("UPDATE clientes SET nome=$1, email=$2 WHERE id=$3;", [
      nome,
      email,
      id,
    ]);

    console.log(`Cliente alterado: ID ${id}`);
    res.sendStatus(202);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.delete("/cliente", async (req, res) => {
  try {
    const id = req.body.id;

    await db.none("DELETE FROM clientes WHERE id=$1;", [id]);

    console.log(`Cliente removido: ID ${id}`);
    res.sendStatus(202);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
