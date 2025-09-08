require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Necessário para servir ficheiros
const authRoutes = require('./authRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

// --- Servir Arquivos Estáticos ---
// Esta linha diz ao Express para servir qualquer ficheiro que esteja na mesma pasta do server.js
// Isto inclui o seu index.html, e futuramente, ficheiros CSS ou JS.
app.use(express.static(__dirname));

// --- Rotas da API ---
app.use('/api/auth', authRoutes);

// --- Rota Principal para servir o Frontend ---
// Agora, a rota principal vai entregar o ficheiro da sua aplicação.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Rota de Verificação da API (Opcional, mas útil) ---
// Mantemos uma rota separada para verificar se a API está a funcionar.
app.get('/api/status', (req, res) => {
    res.json({ message: "API do ERP Panificadora está funcionando!" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor a funcionar na porta ${PORT}`);
});
