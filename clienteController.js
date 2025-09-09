const pool = require('./db');

// Função para obter todos os clientes do banco de dados
const getClientes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes ORDER BY nome ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

// Função para criar um novo cliente no banco de dados
const createCliente = async (req, res) => {
    const { nome, email, telefone } = req.body;
    if (!nome) {
        return res.status(400).json({ message: 'O nome do cliente é obrigatório.' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, telefone]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

module.exports = {
    getClientes,
    createCliente,
};
