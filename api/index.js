const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Conectando ao Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.json());

// endpoint para testar a conexão com o banco de dados
app.get('/testar-conexao', async (req, res) => {
    try {
        const { data, error } = await supabase.from('dados').select('*').limit(1);
        if (error) throw error;
        res.json({ mensagem: 'Conexão bem-sucedida!', exemploDeDado: data });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro na conexão com o banco', erro: error.message });
    }
});


// Endpoint para obter dados
app.get('/dados', async (req, res) => {
    const { data, error } = await supabase.from('dados').select('*');
    if (error) return res.status(500).json(error);
    res.json(data);
});

// Endpoint para adicionar dados
app.post('/dados', async (req, res) => {
    const { frequencia_cardiaca, localizacao, data_hora, id } = req.body;
    const { data, error } = await supabase
        .from('dados')
        .insert([{ frequencia_cardiaca, localizacao, data_hora, id }]);

    if (error) return res.status(500).json(error);
    res.status(201).json(data);
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});

app.post('/api/inserir-dado', async (req, res) => {
    try {
        const { id, frequencia_cardiaca, localizacao, data_hora } = req.body;

        const { data, error } = await supabase
            .from('dados') // Nome da tabela no Supabase
            .insert([
                { 
                    id, 
                    frequencia_cardiaca, 
                    localizacao, 
                    data_hora 
                }
            ]);

        if (error) throw error;

        res.json({ mensagem: 'Dados inseridos com sucesso!', data });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao inserir dados', erro: error.message });
    }
});

module.exports = app;
