const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    // Lógica de login completa
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(401).json({ message: 'Credenciais inválidas.' });

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.senha_hash);
        if (!match) return res.status(401).json({ message: 'Credenciais inválidas.' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};
module.exports = { login };
