import {
  Router,
} from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const routes = new Router();

// Não faz sentido existir na real, foi só pelo crud
// routes.get('/:id', userController.show); // Vai chamar o método show na classe UserController

// Também n faz mt sentido mas vou deixar pq fica melhor pra testar
routes.get('/', userController.index); // Vai chamar o método index na classe UserController

routes.post('/', userController.store); // Vai chamar o método store na classe UserController
routes.put('/', loginRequired, userController.update); // Vai chamar o método update na classe UserController
routes.delete('/', loginRequired, userController.delete); // Vai chamar o método delete na classe UserController
export default routes;

// Por padrão, temos até 5 métodos que podemos usar em um controller:
// index: Retorna uma lista de registros -> GET
// show: Retorna um registro -> GET
// store: Cria um registro -> POST
// update: Atualiza um registro -> PUT ou PATCH
// delete: Deleta um registro -> DELETE
