// Carrega as variáveis de ambiente do ficheiro .env
require('dotenv').config();

// Importa as dependências necessárias
const express = require('express');
const cors = require('cors');

// Importa as nossas novas rotas de autenticação
const authRoutes = require('./routes/auth'); 

// Inicializa a aplicação Express
const app = express();

// --- Configuração dos Middlewares ---
// Ativa o CORS para permitir que o nosso frontend (em outro domínio/porta)
// se comunique com esta API sem problemas de segurança do navegador.
app.use(cors());

// Ativa o middleware do Express para "entender" requisições com corpo em formato JSON.
// É essencial para que `req.body` funcione nas nossas rotas.
app.use(express.json());


// --- Definição das Rotas ---
// Diz ao Express para usar o ficheiro de rotas de autenticação.
// Todas as rotas definidas em 'authRoutes' serão prefixadas com '/api/auth'.
// Exemplo: a rota '/login' em auth.js torna-se '/api/auth/login'
app.use('/api/auth', authRoutes);


// --- Rota de Verificação (Opcional) ---
// Uma rota simples para verificar se a API está online.
app.get('/', (req, res) => {
    res.json({ message: "API do ERP Panificadora está funcionando!" });
});


// --- Inicialização do Servidor ---
// Define a porta a partir do ficheiro .env ou usa 3002 como padrão.
// Usamos 3002 para não haver conflito com a sua outra aplicação.
const PORT = process.env.PORT || 3002;

// Inicia o servidor e fá-lo "ouvir" por requisições na porta definida.
app.listen(PORT, () => {
    console.log(`Servidor a funcionar na porta ${PORT}`);
});

