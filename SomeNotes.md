
## EsLint

- Primeiro vamos baixar o ES Lint para formatação e correção de código
- Vamos instalar o ES Lint com o comando: npm install eslint@6.6.0 --save-dev pra ser a mesma versão
- Infelizmente ta depreciado e tem gente q usa o prettier

```Js
const app = 'ola tudo bem';

// eslint-disable-next-line
console.log(app); // eslint-disable-line // Qualquer um dos 2 serve
// Ou eu altero a regra qla no arquivo .eslintrc.js ou eu desabilito a regra no arquivo que estou trabalhando com comentarios
```

## Nodemon e Sucrase
- Alguma coisa de import e export
- npm install sucrase nodemon -D
- Vamos criar um arquivo nodemon.json e colocar o seguinte conteudo:
```Json
{
  "execMap": {
    "js": "node -r sucrase/register"
  }
}
```
- O objetivo é fazer com que o nodemon execute o sucrase antes de executar o node
- Além disso o vamos adicionar o script dev no package.json
```Json
"scripts": {
  "dev": "nodemon -r sucrase/register src/server.js"
}
```
- Isso serve para que o nodemon execute o sucrase antes de executar o arquivo server.js, o objetivo do nodemon é monitorar as alterações no código e reiniciar o servidor automaticamente além de executar o sucrase, e o objetivo do sucrase é permitir o uso de import/export no código e não apenas require/module.exports
- Agora se eu fizer "import express from 'express';" vai funcionar, mesmo q imports n sejam permidos no node


## Sequelize
- Vamos instalar o sequelize com o comando: npm install sequelize
- Sequelize é um ORM para Node.js, ele é um mapeador de objetos relacionais, ele permite que a gente manipule o banco de dados com objetos, ou seja, ao invés de escrever SQL, a gente escreve código JavaScript só que o Sequelize se encarrega de traduzir esse código JavaScript para SQL, tendo assim, uma abstração do banco de dados

- Vamos la instalar o sequelize q da trampo
1. npm install sequelize
2. Vamos agora criar o arquivo chamado .sequelizerc na raiz do projeto que é onde vamos criar os caminhos e outras config do sequelize
```Js
module.exports = {

  config: path.resolve(__dirname, 'src', 'config', 'database.js'), // caminho do arquivo de configuração
  'models-path': path.resolve(__dirname, 'src', 'models'), // caminho dos models
  'migrations-path': path.resolve(__dirname, 'src', 'database', 'migrations '), // são os arquivos de migração, tipo uma linha do tempo do banco de dados
  'seeders-path': path.resolve(__dirname, 'src', 'database', 'seeds') // são os arquivos de seed, que são os arquivos que populam o banco de dados
};
```
3. Agora, precisamos criar o arquivo de database.js dentro da pasta config
```Js
require('dotenv').config()

// Congiguração do banco de dados
module.exports = {
  dialect: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true, // Adiciona as colunas createdAt e updatedAt
    underscored: true, // Adiciona o padrão snake_case nas tabelas e colunas
    underscoredAll: true, // Adiciona o padrão snake_case nas tabelas e colunas nomeAluno -> nome_aluno
    createdAt: 'created_at', // Nome da coluna de criação
    updatedAt: 'updated_at', // Nome da coluna de atualização // Só pra caso o undercored não funcione em tudo
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo'
  },
  timezone: 'America/Sao_Paulo',
}
```
4. Agora já da pra entrar no MySQL Workbench e criar um banco de dados com o nome q eu coloquei no arquivo .env
5. Vamos instalar o mariadb e o sequelize com o comando: npm install mariadb sequelize sequelize-cli
6. Agora precisamos criar uma migration para fazer o sequelize criar a tabela no banco de dados: npx sequelize migration:create --name=alunos
7. Agora, se tudo deu certo, dentro de database/migrations vai ter um arquivo com o tempo que foi criado -alunos.js, isso é feito assim por que o sequelize cria um arquivo com o tempo que foi criado para que não tenha conflito de nomes, assim, vc pode manter o historico de migrações e evitar quebrar o sistema
8. Agora vamos abrir o arquivo de migration que ja tem uns comentarios falando sobre e configurar a tabela
```Js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('alunos', {
      // Vamos criar os campos da tabela
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      peso: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      altura: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      // Temos que criar esses campos, mas não precisamos mandar seus dados
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

  },

  async down (queryInterface) {

    await queryInterface.dropTable('alunos');

  }
};
```
9. Agora vamos rodar o comando: npx sequelize db:migrate para criar a tabela no banco de dados
10. Agora a tabela ta criada, que lindo
11. Agora precisamos criar o Model para podermos manipular a tabela, vamos criar o arquivo alunos.js dentro da pasta models com o seguinte conteudo:
```Js
```
12. Agora que temos um model, precisamos iniciar ele na base de dados do sequelize, pra isso, precisamos criar um index.js dentro da pasta database para fazer a conexão com o banco de dados e iniciar os models
```Js
```
13. Agora que temos o index.js, precisamos importar ele no arquivo server.js para que ele inicie a conexão com o banco de dados
```Js
```
14. Terminada a parte de configuração do sequelize, vamos criar um sistema de usuarios, onde só usuarios logados podem acessar determinadas features do sistema, vamos criar uma migration, um model e um controller para isso
15. Para criar essa tabela no sistema, vamos criar uma migration com o comando: npx sequelize migration:create --name=usuarios
16. Agora vamos abrir o arquivo de migration e configurar a tabela, pra isso, eu vou só copiar oq a gente ja escreveu na migration de alunos e mudar o nome da tabela e os campos
```Js
```
17. Agora podemos fazer a migração, rodando "npx sequelize db:migrate", vale notar que com "npx sequelize db:migrate:undo" a gente pode desfazer a migração
18. Agora vamos criar o model de usuarios, vamos criar o arquivo usuarios.js dentro da pasta models com o conteudo extremamente parecido com o de alunos:
```Js
```
19. A questão é que estamos armazenando no usuario um hash da senha, por isso la temos o password e o password hash, mas a password é um campo virtual, ou seja, não vai ser armazenado no banco de dados, só o password hash, para fazer com que o password hash seja realmente um hash da senha, vamos usar o bcryptjs, vamos instalar ele com o comando: npm install bcryptjs
20. Agora vamos criar um hook no model de usuarios para fazer com que o password seja transformado em password hash antes de ser salvo no banco de dados, vamos fazer isso no arquivo usuarios.js
```Js
```
21. Agora que temos o hook, vamos criar um controller para manipular os usuarios, vamos criar o arquivo usuariosController.js dentro da pasta controllers com o seguinte conteudo:
```Js
```
22. Agora que temos o controller, vamos criar as rotas para manipular os usuarios, vamos criar o arquivo usuariosRoutes.js dentro da pasta routes com o seguinte conteudo:
```Js
```
23. Além disso, não posso esquecer de adicionar o user la no index.js da pasta database
24. Agora só criar todas as rotas e funções no usersController.js, ta tudo explicadinho la


# JWT
1. Vamos instalar o JWT para fazer a autenticação dos usuarios, vamos instalar com o comando: npm install jsonwebtoken
2. Criamos no .env as variaveis de expiração   
