// src/app.js
const express = require("express");
const app = express();
const sequelize = require("./db");
const cors = require("cors");

// Rutas
const reviews = require("./src/routes/index");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
  })
  .catch((error) => {
    console.error("Error en la conexión a la base de datos:", error);
  });

// Rutas
app.use("/", reviews);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

module.exports = app;