class HomeController {
  async index(req, res) {
    return res.json('Seja bem Vindo!!!');
  }
}

export default new HomeController(); // Exporta uma instância da classe HomeController
