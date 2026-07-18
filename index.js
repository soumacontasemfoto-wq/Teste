const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Banco de dados em memória para guardar as chaves criadas pelo seu bot do Discord
let keysGeradas = ["CHAVE-TESTE"]; 
let bots = [];

app.use(cors());
app.use(express.json());

// ─── 1. ROTA ONDE SEU BOT DO DISCORD SALVA A KEY (POST /gerarkey) ─────────────
app.post("/gerarkey", (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ success: false, message: "A chave é obrigatória." });
  
  if (!keysGeradas.includes(key)) keysGeradas.push(key);
  return res.status(200).json({ success: true, message: "Chave registrada no servidor com sucesso!" });
});

// ─── 2. ROTA ONDE O APP VERIFICA A KEY PARA LOGAR (POST /login) ───────────────
// Mantido como /login exatamente como está configurado no seu app Sketchware
app.post("/login", (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ success: false, message: "Campo 'key' é obrigatório." });

  // Verifica se a chave digitada no app está na lista de chaves válidas
  if (keysGeradas.includes(key)) {
    return res.status(200).json({ success: true, message: "Login realizado com sucesso." });
  } else {
    return res.status(401).json({ success: false, message: "Key inválida ou expirada." });
  }
});

// ─── 3. ROTA ONDE O APP SALVA OS BOTS DO DISCORD (POST /bots) ─────────────────
app.post("/bots", (req, res) => {
  const { nome, token, linguagem, codigo } = req.body;
  if (!nome || !token || !linguagem || !codigo) {
    return res.status(400).json({ success: false, message: "Campos obrigatórios faltando." });
  }
  
  const novoBot = { id: Date.now().toString(), nome, token, linguagem, codigo };
  bots.push(novoBot);
  return res.status(201).json({ success: true, message: "Bot salvo com sucesso.", bot: novoBot });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
