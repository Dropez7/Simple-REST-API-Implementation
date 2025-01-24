"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize); // Importando o Sequelize e o Model de dentro do Sequelize

 class Aluno extends _sequelize.Model { // Criando a classe Aluno que extende de Model
  static init(sequelize) { // Método estático init que recebe o sequelize
    super.init({ // é a mesma coisa q na migration, mas aqui é um objeto referente a modelagem, la era a criação
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      sobrenome: {
        type: _sequelize2.default.STRING,
        defaultValue: '', // valor padrão
        validate: { // validação
          // notEmpty: {
          //   msg: 'Campo nome não pode ser vazio', // Exemplo de como faço a validação
          // },
          len: {
            args: [3, 255],
            msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres',
          },
        },

      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'E-mail Inválido',
          },
        },

      },
      idade: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Idade precisa ser um numero inteiro',
          },
        },

      },
      peso: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Peso precisa ser um numero inteiro ou de Ponto Flutuante',
          },
        },

      },
      altura: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Altura precisa ser um numero inteiro ou de Ponto Flutuante',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' }); // Um aluno tem muitas fotos
  }
} exports.default = Aluno;
