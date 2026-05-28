const express = require("express");
const cors = require("cors");
const tarefaRoutes = require("./routes/tarefaRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.get("/", (req, res) => {
    res.json({ mensagem: "API de Tarefas funcionando!" });
});
app.use("/tarefas", tarefaRoutes);
app.use((req, res) => {
    res.status(404).json({
        erro: `Rota ${req.method} ${req.originalUrl} n~ao encontrada`,
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ erro: "Erro interno do servidor" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});