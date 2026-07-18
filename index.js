const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Bancos de dados temporários em memória
let keysGeradas = ["CHAVE-TESTE"]; 
let usuariosCadastrados = [{ usuario: "admin", senha: "123" }];
let bots = [];

app.use(cors());
app.use(express.json());

// ─── 1. ROTA PARA O BOT DO DISCORD (POST /gerarkey) ──────────────────────────
app.post("/gerarkey", (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ success: false, message: "A chave é obrigatória." });
  
  if (!keysGeradas.includes(key)) keysGeradas.push(key);
  return res.status(200).json({ success: true, message: "Chave registrada com sucesso!" });
});

// ─── 2. LOGIN POR KEY (POST /login-key) ──────────────────────────────────────
// No Sketchware, use o link com /login-key se o app for entrar por chave
app.post("/login-key", (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ success: false, message: "Campo 'key' é obrigatório." });

  if (keysGeradas.includes(key)) {
    return res.status(200).json({ success: true, message: "Login por Key realizado!" });
  } else {
    return res.status(401).json({ success: false, message: "Key inválida ou expirada." });
  }
});

// ─── 3. LOGIN POR USUÁRIO E SENHA (POST /login-usuario) ──────────────────────
// No Sketchware, use o link com /login-usuario se o app for entrar por dados comuns
app.post("/login-usuario", (req, res) => {
  const { usuario, senha } = req.body;
  if (!usuario || !senha) return res.status(400).json({ success: false, message: "Campos obrigatórios." });

  const contaEncontrada = usuariosCadastrados.find((u) => u.usuario === usuario && u.senha === senha);
  if (!contaEncontrada) return res.status(401).json({ success: false, message: "Usuário ou senha incorretos." });

  return res.status(200).json({ success: true, message: "Login por usuário realizado!" });
});

// ─── 4. ROTA PARA SALVAR OS BOTS (POST /bots) ───────────────────────────────
app.post("/bots", (req, res) => {
  const { nome, token, linguagem, codigo } = req.body;
  if (!nome || !token || !linguagem || !codigo) return res.status(400).json({ success: false, message: "Campos obrigatórios faltando." });
  
  const novoBot = { id: Date.now().toString(), nome, token, linguagem, codigo };
  bots.push(novoBot);
  return res.status(201).json({ success: true, message: "Bot salvo com sucesso.", bot: novoBot });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
