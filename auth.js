// src/routes/auth.js

const express = require('express');
const router = express.Router();

// Importa o controlador de autenticação que contém a lógica de login
const authController = require('../controllers/authController');

// Define a rota POST para /login
// Quando uma requisição POST chegar em /api/auth/login, ela será direcionada
// para a função 'login' dentro do authController.
router.post('/login', authController.login);

// Exporta o router para ser usado no arquivo principal do servidor (server.js)
module.exports = router;
