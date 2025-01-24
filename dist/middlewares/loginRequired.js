"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const {
      id,
      email,
    } = dados;

    // Tem uma imensa discussão sobre quando eu mudo o email ou o id, se eu devo ou não atualizar o token, mas eu acho que não, pq se eu mudar o email ou o id, eu vou ter que fazer login de novo, então não faz sentido atualizar o token, para isso, o que eu vou fazer é checar se o email e o id ainda correspondem ao que se encontra na base de dados, se não corresponderem, eu vou mandar um erro
    const user = await _User2.default.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }

  return next();
};
