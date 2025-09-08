// Carrega as variáveis de ambiente do ficheiro .env
require('dotenv').config();

// Importa as dependências necessárias
const express = require('express');
const cors = require('cors');

// Importa as nossas rotas (agora no mesmo diretório)
const authRoutes = require('./authRoutes'); 

// Inicializa a aplicação Express
const app = express();
app.use(cors());
app.use(express.json());

// --- Definição das Rotas ---
// A rota '/login' em authRoutes.js torna-se '/api/auth/login'
app.use('/api/auth', authRoutes);

// --- Rota de Verificação ---
app.get('/', (req, res) => {
    res.json({ message: "API do ERP Panificadora está funcionando!" });
});

// --- Inicialização do Servidor ---
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor a funcionar na porta ${PORT}`);
});
