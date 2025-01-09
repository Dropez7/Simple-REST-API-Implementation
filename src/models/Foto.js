import Sequelize, {
  Model,
} from 'sequelize'; // Importando o Sequelize e o Model de dentro do Sequelize

export default class Foto extends Model {
  static init(sequelize) { // Método estático init que recebe o sequelize
    super.init({ // é a mesma coisa q na migration, mas aqui é um objeto referente a modelagem, la era a criação
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  // static associate(models) {
  //   this.belongsTo(models.Aluno, { // Esse model pertece a um aluno
  //     foreignKey: 'aluno_id',
  //   });
  // }
}
