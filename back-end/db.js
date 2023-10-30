const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  username: "postgres",
  password: "corsaverde",
  host: "127.0.0.1", // O la dirección de tu base de datos
  port: 5432, // El puerto de PostgreSQL
  database: "proyecto-peliculas",
});

module.exports = sequelize;
