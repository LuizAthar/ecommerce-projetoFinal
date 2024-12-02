const jwt = require('jsonwebtoken');

// Middleware para autenticar e autorizar usuários com base em tipos permitidos
const autenticarUsuario = (tiposAutorizados = []) => (req, res, next) => {
    const authHeader = req.headers.authorization; // Extrai o cabeçalho Authorization
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Remove o prefixo 'Bearer '
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        // Verifica o token e extrai os dados do payload
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');

        // Se houver tipos autorizados, valida o tipo do usuário
        if (tiposAutorizados.length > 0 && !tiposAutorizados.includes(payload.tipo)) {
            return res.status(403).json({ error: 'Acesso não autorizado para este tipo de usuário' });
        }

        // Adiciona o ID e o tipo do usuário à requisição
        req.userId = payload.id;
        req.userTipo = payload.tipo;

        next(); // Passa para o próximo middleware ou controller
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};

module.exports = autenticarUsuario;
