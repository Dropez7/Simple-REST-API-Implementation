import Sequelize, { Model } from 'sequelize'; // Importando o Sequelize e o Model de dentro do Sequelize

export default class Aluno extends Model { // Criando a classe Aluno que extende de Model
  static init(sequelize) { // Método estático init que recebe o sequelize
    super.init({ // é a mesma coisa q na migration, mas aqui é um objeto referente a modelagem, la era a criação
      nome: Sequelize.STRING,
      sobrenome: Sequelize.STRING,
      email: Sequelize.STRING,
      idade: Sequelize.INTEGER,
      peso: Sequelize.FLOAT,
      altura: Sequelize.FLOAT,
    }, {
      sequelize,
    });
    return this;
  }
}
