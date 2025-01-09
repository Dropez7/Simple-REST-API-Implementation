// eslint-disable-next-line import/no-extraneous-dependencies
import multer from 'multer';
import {
  extname,
  resolve,
} from 'path';

const random = Math.floor(Math.random() * 1000);

// Ainda tenho q fazer as config do multer la na rota que eu quero usar as imagens

export default {

  fileFilter: (req, file, cb) => { // Faço isso pra não permitir que o cara envie um arquivo que não seja uma imagem
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
      return cb(new multer.MulterError('Arquivo precisa ser PNG, JPEG ou JPG')); // To criando um erro do multer
    }
    return cb(null, true); // Caso de sucesso
  },

  storage: multer.diskStorage({ // Disk Storage é para salvar no disco do servidor (no caso o meu pc)
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads')); // Caso de erro
    },
    filename: (req, file, cb) => {
      // vamos gerar um novo nome, pq se o cara colocar um nome ruim, n fica ruim pra mim manipular
      cb(null, `${Date.now()}_${random}${extname(file.originalname)}`); // null é o erro, e o segundo parametro é o nome do arquivo, crio um nome com a data atual juntamente de um numero aleatorio para ser unico e a extensão do arquivo
    },

  }),
};
