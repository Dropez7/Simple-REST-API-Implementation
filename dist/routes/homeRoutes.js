"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Importa o Router do express
// eslint-disable-next-line import/no-extraneous-dependencies
var _express = require('express');
// Importa o HomeController camelCase por que é uma instancia de classe
var _HomeController = require('../controllers/HomeController'); var _HomeController2 = _interopRequireDefault(_HomeController);

// Inicia um objeto Router
const routes = new (0, _express.Router)(); // Inicia o Router

// Retorna um JSON com a mensagem "Hello World"
routes.get('/', _HomeController2.default.index); // Vai chamar o método index da classe HomeController

// Exporta as rotas para serem usadas em outro arquivo
exports. default = routes;
