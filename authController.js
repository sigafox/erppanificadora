const pool = require('./db'); // Importa a conexão (agora no mesmo diretório)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const userResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const user = userResult.rows[0];
        const isPasswordMatch = await bcrypt.compare(password, user.senha_hash);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.status(200).json({ 
            message: 'Login bem-sucedido!',
            token: token 
        });

    } catch (error) {
        console.error('Erro no servidor durante o login:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

module.exports = {
    login,
};
