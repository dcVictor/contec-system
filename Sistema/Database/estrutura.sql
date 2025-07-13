

CREATE TABLE endereco (
    endercod SERIAL PRIMARY KEY,
    lgdr VARCHAR(100) NOT NULL,
    numero BIGINT,
    complmt VARCHAR(200),
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    cep VARCHAR(50) NOT NULL
);

CREATE TABLE pecas (
    codpeca SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    preco BIGINT NOT NULL
);

CREATE TABLE cliente (
    cpf BIGINT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    fone BIGINT,
    email VARCHAR(50),
    endercli INTEGER NOT NULL,
    CONSTRAINT fk_cliente_endereco FOREIGN KEY (endercli) REFERENCES endereco(endercod)
);

CREATE TABLE instalador (
    cpf BIGINT PRIMARY KEY,
    fone BIGINT NOT NULL,
    email VARCHAR(60) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    habilit VARCHAR(5) NOT NULL
);

CREATE TABLE pedido (
    codped SERIAL PRIMARY KEY,
    cliente BIGINT NOT NULL,
    statped VARCHAR(30) NOT NULL,
    valped BIGINT NOT NULL,
    comp NUMERIC(10,0) ,
    altura NUMERIC(10,0) ,
    dtpdd DATE,
    dtentg DATE,
    enderped INTEGER NOT NULL,
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (cliente) REFERENCES cliente(cpf),
    CONSTRAINT fk_pedido_endereco FOREIGN KEY (enderped) REFERENCES endereco(endercod)
);

CREATE TABLE servico (
    codserv SERIAL PRIMARY KEY,
    inst BIGINT,
    valserv BIGINT NOT NULL,
    tipserv VARCHAR(20) NOT NULL,
    dtserv DATE NOT NULL,
    codped INTEGER,
    CONSTRAINT fk_servico_instalador FOREIGN KEY (inst) REFERENCES instalador(cpf),
    CONSTRAINT fk_servico_pedido FOREIGN KEY (codped) REFERENCES pedido(codped)
);

CREATE TABLE usuario (
    codusuario SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    telefone BIGINT NOT NULL,
    cargo VARCHAR(30) NOT NULL
    CONSTRAINT unique_u UNIQUE (nome, email) 
);

CREATE TABLE itempedido (
    peca INTEGER NOT NULL,
    pedido INTEGER NOT NULL,
    qtd BIGINT NOT NULL,
    PRIMARY KEY (peca, pedido),
    CONSTRAINT fk_itempedido_peca FOREIGN KEY (peca) REFERENCES pecas(codpeca),
    CONSTRAINT fk_itempedido_pedido FOREIGN KEY (pedido) REFERENCES pedido(codped)
);