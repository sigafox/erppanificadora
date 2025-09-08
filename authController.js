// src/controllers/authController.js

// Importa a conexão com o banco de dados
const pool = require('../config/db');
// Importa o bcrypt para comparar senhas de forma segura
const bcrypt = require('bcryptjs');
// Importa o jsonwebtoken para criar tokens de autenticação
const jwt = require('jsonwebtoken');

// Função assíncrona para lidar com o login
const login = async (req, res) => {
    // Extrai o email e a senha do corpo da requisição
    const { email, password } = req.body;

    // Validação básica: verifica se email e senha foram enviados
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        // --- Passo 1: Encontrar o utilizador no banco de dados ---
        // ATENÇÃO: Esta query assume que você terá uma tabela 'usuarios'
        // Você precisará criar essa tabela no seu banco de dados PostgreSQL
        const userResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        
        // Verifica se o utilizador foi encontrado
        if (userResult.rows.length === 0) {
            // Se não encontrou, retorna um erro de não autorizado (sem dar muitos detalhes por segurança)
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const user = userResult.rows[0];

        // --- Passo 2: Comparar a senha enviada com a senha armazenada (hash) ---
        // A função bcrypt.compare faz a comparação de forma segura
        const isPasswordMatch = await bcrypt.compare(password, user.senha_hash);

        // Se as senhas não corresponderem, retorna um erro
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // --- Passo 3: Se tudo estiver correto, criar o Token JWT ---
        // O token conterá o ID do utilizador, que será útil para futuras requisições
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET, // Usa a chave secreta definida no seu ficheiro .env
            { expiresIn: '8h' } // Define um tempo de expiração para o token
        );

        // --- Passo 4: Enviar a resposta de sucesso com o token ---
        res.status(200).json({ 
            message: 'Login bem-sucedido!',
            token: token 
        });

    } catch (error) {
        console.error('Erro no servidor durante o login:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

// Exporta a função de login para que possa ser usada nas rotas
module.exports = {
    login,
};
