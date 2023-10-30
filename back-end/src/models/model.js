const sequelize = require("../../db"); // Asegúrate de importar la instancia Sequeliz
const { Sequelize, DataTypes } = require("sequelize");

// Define el modelo Reviews
const Reviews = sequelize.define("calificaciones", {
  titulo: {
    type: DataTypes.STRING,
  },
  backdrop: {
    type: DataTypes.STRING,
  },
  calificacion: {
    type: DataTypes.INTEGER,
  },
  // Otros campos del modelo
});

// Sincroniza los modelos con la base de datos
sequelize.sync();

module.exports = Reviews;
