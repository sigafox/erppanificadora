require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: "API do ERP Panificadora está funcionando!" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor a funcionar na porta ${PORT}`);
});
