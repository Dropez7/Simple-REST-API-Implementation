import Aluno from '../models/Aluno'; // Importa o model Aluno
import Foto from '../models/Foto'; // Importa o model Foto

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [
          ['id', 'DESC'],
          [Foto, 'id', 'DESC'],
        ],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });

      if (!alunos) {
        return res.status(400).json({
          errors: ['Nenhum Aluno Encontrado'],
        });
      }

      return res.json(alunos);
    } catch (e) {
      return res.status(400).json({
        e,
      });
    }
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const {
        id,
      } = req.params;

      console.log(id);

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [
          ['id', 'DESC'],
          [Foto, 'id', 'DESC'],
        ],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    const {
      id,
    } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: ['ID não enviado'],
      });
    }

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(400).json({
        errors: ['Aluno não encontrado'],
      });
    }

    await aluno.destroy();
    return res.json({
      deleted: true,
    });
  }

  async update(req, res) {
    const {
      id,
    } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: ['ID não enviado'],
      });
    }

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(400).json({
        errors: ['Aluno não encontrado'],
      });
    }

    const alunoAtt = await aluno.update(req.body);
    return res.json(alunoAtt);
  }
}

export default new AlunoController(); // Exporta uma instância da classe HomeController
