import dotenv from 'dotenv'; // Inicia o dotenv

import express from 'express'; // graças ao sucrase
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import alunoRoutes from './src/routes/alunoRoutes';
import './src/database'; // chamando o index.js da pasta database para iniciar a conexão com os models
// Importa o dotenv
dotenv.config(); // Importa as rotas da home

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  // middlewares são funções que são executadas antes das rotas
  middlewares() { // Vai iniciar todos os middlewares
    this.app.use(express.json()); // Vai permitir que a aplicação receba requisições no formato JSON
    this.app.use(express.urlencoded({ extended: true })); // Vai permitir que a aplicação receba requisições pelo body
  }

  // routes são funções que são executadas quando uma rota é acessada
  routes() { // Vai iniciar todas as rotas
    // Ta assim pq temos varios arquivos de rotas
    this.app.use('/', homeRoutes); // Vai usar as rotas da home
    this.app.use('/users/', userRoutes); // Vai usar as rotas de users
    this.app.use('/tokens/', tokenRoutes); // Vai usar as rotas de tokens
    this.app.use('/alunos/', alunoRoutes);
  }
}

export default new App().app; // Vai exportar a aplicação pronta para ser usada
