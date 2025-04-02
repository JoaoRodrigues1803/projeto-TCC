const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Importando dados do JSON
const data = require('./dados.json');

app.use(cors());
app.use(express.json());

// Rota para obter os dados atuais
app.get('/dados', (req, res) => {
    res.json(data.dados);
});

// Rota para obter o histórico
app.get('/historico', (req, res) => {
    res.json(data.historico);
});

// Rota para obter alertas
app.get('/alertas', (req, res) => {
    res.json(data.alerta);
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});

module.exports = app;
