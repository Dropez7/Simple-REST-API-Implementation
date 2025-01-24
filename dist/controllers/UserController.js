"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User); // Importa o model User

class UserController {
  async store(req, res) {
    try {
      const novoUser = await _User2.default.create({ // Cria um novo User
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password,
      });

      const {
        id,
        nome,
        email,
      } = novoUser;
      return res.json({
        id,
        nome,
        email,
      }); // Retorna o User Criado
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      const users = await _User2.default.findAll({
        attributes: ['id', 'nome', 'email'],
      }); // Busca todos os Users
      return res.json(users); // Retorna os Users
    } catch (e) {
      return res.json(e);
    }
  }

  // show
  async show(req, res) {
    try {
      const {
        id,
      } = req.params;
      const user = await _User2.default.findByPk(id); // Busca um User pelo ID
      return res.json(user); // Retorna o User
    } catch (e) {
      return res.json(null);
    }
  }

  // update
  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId); // Busca um User pelo ID
      if (!user) {
        return res.status(400).json({
          errors: ['User não existe'],
        });
      }

      // Tive q tomar cuidado pq as validações ainda funcionam, ent n da pra mudar pra um email que ja existe, além de que uma senha com menos de 6 caracteres n vai ser aceita, e se eu n mandasse ele daria erro pq tentaria fazer o hash de algo q n existe, mas ja ajeitei
      // Pra poder atualizar o User, precisamos do ID dele e mandar os novos dados no body
      const novosDados = await user.update(req.body); // Atualiza os dados do User

      const {
        id,
        nome,
        email,
      } = novosDados;

      return res.json({
        id,
        nome,
        email,
      }); // Retorna os novos dados do User
    } catch (e) {
      return res.status(400).json({
        errors: e,
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId); // Busca um User pelo ID

      if (!user) {
        return res.status(400).json({
          errors: ['User não existe'],
        });
      }

      const {
        id,
        nome,
        email,
      } = user;

      await user.destroy(); // Deleta o User
      return res.json({
        id,
        nome,
        email,
      }); // Retorna o User Deletado
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new UserController(); // Exporta uma instância da classe UserController
