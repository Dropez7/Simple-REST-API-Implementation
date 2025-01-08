// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Router,
} from 'express';
import alunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const routes = new Router();

routes.get('/', alunoController.index);
routes.get('/:id', alunoController.show);
routes.post('/store', loginRequired, alunoController.store);
routes.put('/update/:id', loginRequired, alunoController.update);
routes.delete('/delete/:id', loginRequired, alunoController.delete);

export default routes;

// Tem q lembrar de adicionar no App
