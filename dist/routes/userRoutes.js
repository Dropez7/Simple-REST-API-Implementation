"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const routes = new (0, _express.Router)();

// Não faz sentido existir na real, foi só pelo crud
// routes.get('/:id', userController.show); // Vai chamar o método show na classe UserController

// Também n faz mt sentido mas vou deixar pq fica melhor pra testar
// routes.get('/', userController.index); // Vai chamar o método index na classe UserController

routes.post('/', _UserController2.default.store); // Vai chamar o método store na classe UserController
routes.put('/:id', _loginRequired2.default, _UserController2.default.update); // Vai chamar o método update na classe UserController
routes.delete('/:id', _loginRequired2.default, _UserController2.default.delete); // Vai chamar o método delete na classe UserController
exports. default = routes;

// Por padrão, temos até 5 métodos que podemos usar em um controller:
// index: Retorna uma lista de registros -> GET
// show: Retorna um registro -> GET
// store: Cria um registro -> POST
// update: Atualiza um registro -> PUT ou PATCH
// delete: Deleta um registro -> DELETE
