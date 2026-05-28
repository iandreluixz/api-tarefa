const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "tarefas_db",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
pool.connect((err, client, release) => {
    if (err) {
        return console.error("Erro ao conectar ao banco de dados:", err.stack);
    }
    console.log("Conectado ao PostgreSQL com sucesso!");
    release();
});
module.exports = pool;
