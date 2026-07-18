const express = require('express');
const cors = require('cors');

const app = express();

// Ativa o CORS e permite que o servidor receba dados em formato JSON
app.use(cors());
app.use(express.json());

// A rota que o seu Sketchware vai chamar para testar o botão salvar
app.post('/bots', (req, res) => {
    const { nome_bot, token_bot, linguagem, codigo_bot } = req.body;

    console.log("📥 Dados recebidos do Sketchware:", req.body);

    // Validação dos campos obrigatórios
    if (!nome_bot || !token_bot || !codigo_bot) {
        return res.status(400).json({ 
            success: false, 
            message: "Campos obrigatórios faltando!" 
        });
    }

    // Resposta de sucesso perfeita para o Sketchware ler
    return res.json({ 
        success: true, 
        message: "Bot salvo com sucesso (Modo Teste)!" 
        });
});

// Rota inicial só para você clicar e ver se o site está online
app.get('/', (req, res) => {
    res.send('🚀 O servidor de testes está online e ativo!');
});

// Usa a porta do Render ou a 3000 por padrão
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`💻 Servidor rodando na porta ${PORT}`);
});
