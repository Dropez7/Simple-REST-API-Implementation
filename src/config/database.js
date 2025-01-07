require('dotenv').config();

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
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',
};
