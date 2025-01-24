"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// eslint-disable-next-line import/no-extraneous-dependencies


var _express = require('express');
var _AlunoController = require('../controllers/AlunoController'); var _AlunoController2 = _interopRequireDefault(_AlunoController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const routes = new (0, _express.Router)();

routes.get('/', _AlunoController2.default.index);
routes.get('/:id', _AlunoController2.default.show);
routes.post('/store', _loginRequired2.default, _AlunoController2.default.store);
routes.put('/update/:id', _loginRequired2.default, _AlunoController2.default.update);
routes.delete('/delete/:id', _loginRequired2.default, _AlunoController2.default.delete);

exports. default = routes;

// Tem q lembrar de adicionar no App
