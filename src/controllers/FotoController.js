// eslint-disable-next-line import/no-extraneous-dependencies
import multer from 'multer';

// eslint-disable-next-line
import multerconfig from '../config/multerconfig'; // uso isso aqui como um middleware

import Foto from '../models/Foto';

const upload = multer(multerconfig).single('Foto');

class FotoController {
  async store(req, res) {
    return upload(req, res, (err) => { // é do proprio multer
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try { // melhor do que verificar no bd pelo trabalho que vai dar
        const {
          originalname,
          filename,
        } = req.file;

        const {
          aluno_id,
        } = req.body;

        const foto = Foto.create({
          originalname,
          filename,
          aluno_id,
        });

        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

export default new FotoController(); // Exporta uma instância da classe HomeController
