const express = require('express');
const router = express.Router();
const clienteController = require('./clienteController');

// Define o endereço para obter a lista de clientes (GET /api/clientes)
router.get('/', clienteController.getClientes);

// Define o endereço para criar um novo cliente (POST /api/clientes)
router.post('/', clienteController.createCliente);

module.exports = router;
