const express = require("express");
    const cors = require("cors");

    const app = express();
    const PORT = process.env.PORT || 3000;

    const VALID_KEYS = process.env.VALID_KEYS
    ? process.env.VALID_KEYS.split(",")
    : ["minha-chave-secreta"];

    let bots = [];

    app.use(cors());
    app.use(express.json());

    app.post("/login", (req, res) => {
    const { key } = req.body;
    if (!key) {
      return res.status(400).json({ success: false, message: "Campo 'key' é obrigatório." });
    }
    if (!VALID_KEYS.includes(key)) {
      return res.status(401).json({ success: false, message: "Chave inválida." });
    }
    return res.status(200).json({ success: true, message: "Login realizado com sucesso." });
    });

    app.post("/bots", (req, res) => {
    const { nome, token, linguagem, codigo } = req.body;
    if (!nome || !token || !linguagem || !codigo) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios: nome, token, linguagem, codigo.",
      });
    }
    const novoBot = {
      id: Date.now().toString(),
      nome,
      token,
      linguagem,
      codigo,
      criadoEm: new Date().toISOString(),
    };
    bots.push(novoBot);
    return res.status(201).json({ success: true, message: "Bot salvo com sucesso.", bot: novoBot });
    });

    app.get("/bots", (req, res) => {
    return res.status(200).json({ success: true, total: bots.length, bots });
    });

    app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    });
    