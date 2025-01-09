import {
  Router,
} from 'express';

import loginRequired from '../middlewares/loginRequired';

import photoController from '../controllers/FotoController';

const routes = new Router();

routes.post('/', loginRequired, photoController.store); // single para um unico arquivo e ('') é o nome do campo que vai receber o arquivo, no caso, é o campo 'photo' que eu passei no insomnia

export default routes;
