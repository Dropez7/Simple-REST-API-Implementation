import Aluno from '../models/Aluno'; // Importa o model Aluno

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({ // Cria um novo aluno
      nome: 'Pedro',
      sobrenome: 'Henrique',
      email: 'pedro24253567@gmail.com',
      idade: 18,
      peso: 2000,
      altura: 1.71,
    });
    return res.json(novoAluno); // Retorna o Aluno Criado
  }
}

export default new HomeController(); // Exporta uma instância da classe HomeController
