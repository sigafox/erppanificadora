// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Importação das rotas (serão criadas nos próximos passos)
// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/products');

// Inicializa a aplicação Express
const app = express();

// Define a porta do servidor. Ele vai tentar usar a do .env, ou a 3001 como padrão.
const PORT = process.env.PORT || 3002;

// --- Middlewares Essenciais ---

// Habilita o CORS para permitir que o nosso frontend acesse esta API
app.use(cors());

// Habilita o Express para entender e processar requisições com corpo em formato JSON
app.use(express.json());


// --- Definição das Rotas da API ---

// Exemplo de como as rotas serão usadas:
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);

// Uma rota de teste inicial para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.json({ message: 'API do ERP Panificadora está funcionando!' });
});


// --- Inicialização do Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
