const express = require('express');
const router = express.Router();

// Importa o controlador (agora no mesmo diretório)
const authController = require('./authController');

// Define a rota POST para /login
router.post('/login', authController.login);

module.exports = router;
