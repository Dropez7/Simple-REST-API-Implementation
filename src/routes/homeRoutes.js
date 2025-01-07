// Importa o Router do express
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express';
// Importa o HomeController camelCase por que é uma instancia de classe
import homeController from '../controllers/HomeController';

// Inicia um objeto Router
const routes = new Router(); // Inicia o Router

// Retorna um JSON com a mensagem "Hello World"
routes.get('/', homeController.index); // Vai chamar o método index da classe HomeController

// Exporta as rotas para serem usadas em outro arquivo
export default routes;
