"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body; // Pegando por desestruturação e atribuindo valores padrão

    // ERRO1
    if (!email || !password) { // Erro case não tenha email ou password
      return res.status(401).json({ errors: ['Credenciais inválidas'] });
    }

    const user = await _User2.default.findOne({ where: { email } }); // Procurando um User com o email

    // ERRO2
    if (!user) { // Se não achar o User
      return res.status(401).json({ errors: ['Usuário não existe'] });
    }

    // ERRO3
    if (!(await user.passwordIsValid(password))) { // Se a senha não for válida
      return res.status(401).json({ errors: ['Senha inválida'] });
    }

    const { id } = user; // Pegando o id do usuario

    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    // payload: Dados que queremos recuperar do usuario depois
    // secretOrPrivateKey: Chave secreta para gerar o token, ta no .env, pode ser qualquer coisa
    // options: Configurações do token
    // expiresIn: Tempo de expiração do token
    const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION }); // Criando o token
    return res.json({ token, user: { nome: user.nome, id, email } }); // Retornando o token
  }
}

exports. default = new TokenController();
