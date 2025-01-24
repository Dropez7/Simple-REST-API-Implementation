"use strict";Object.defineProperty(exports, "__esModule", {value: true});class HomeController {
  async index(req, res) {
    return res.json('Seja bem Vindo!!!');
  }
}

exports. default = new HomeController(); // Exporta uma instância da classe HomeController
