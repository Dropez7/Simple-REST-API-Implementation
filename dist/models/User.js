"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize); // Importando o Sequelize e o Model de dentro do Sequelize
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs); // Importando o bcryptjs para criptografar a senha

 class User extends _sequelize.Model { // Criando a classe Aluno que extende de Model
  static init(sequelize) { // Método estático init que recebe o sequelize
    super.init({ // é a mesma coisa q na migration, mas aqui é um objeto referente a modelagem, la era a criação
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '', // valor padrão
        validate: { // validação
          // notEmpty: {
          //   msg: 'Campo nome não pode ser vazio', // Exemplo de como faço a validação
          // },
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },

      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '', // valor padrão
        validate: { // validação
          isEmail: {
            msg: 'Email Inválido',
          },
        },

      },
      password_hash: {
        type: _sequelize2.default.STRING,
        defaultValue: '', // valor padrão

      },
      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '', // valor padrão
        validate: { // validação
          len: {
            args: [6, 50],
            msg: 'A senha precisa ter entre 6 e 50 caracteres',
          },
        },

      }, // é um campo que nunca vai existir na base de dados, apenas no código, e a gente vai usar ele para fazer a validação
    }, {
      sequelize,
    });

    // AddHook é um método que executa uma função antes ou depois de um evento
    // beforeSave, beforeCreate, beforeUpdate, beforeBulkCreate, beforeBulkUpdate, beforeBulkDestroy, etc...
    this.addHook('beforeSave', async (user) => { // recebe um usuario, e vamos mexer nele
    // Async pq o bcrypt é assincrono e usa promisse
    // Segundo pamarêtro é o número de rounds, quanto maior, mais seguro, mas mais lento

      if (user.password) {
        // eslint-disable-next-line no-param-reassign
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8); // Vai pegar a senha do usuario e criptografar ela
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash); // Vai comparar a senha que o usuario mandou com a senha criptografada
  }
} exports.default = User;
