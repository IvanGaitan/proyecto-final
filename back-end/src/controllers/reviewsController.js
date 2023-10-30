const db = require("../../db");
const Reviews = require("../models/model"); // Importa el modelo

// Obtener todas las reseñas
const readReview = async (req, res) => {
  try {
    const { backdrop } = req.params;
    const review = await Reviews.findOne({ where: { backdrop } });

    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ error: "No se encontró la reseña" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la reseña" });
  }
};

// Crear una nueva reseña
const createReview = async (req, res) => {
  const { titulo, backdrop, calificacion } = req.body;
  try {
    const newReview = await Reviews.create({ titulo, backdrop, calificacion });
    res.json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la reseña" });
  }
};

// Actualizar una reseña por su ID
const updateReview = async (req, res) => {
  const { backdrop } = req.params;
  const { titulo, calificacion } = req.body;
  try {
    const updateReview = await Reviews.findOne({ where: { backdrop } });

    if (updateReview) {
      await updateReview.update({ titulo, calificacion });
      res.json(updateReview);
    } else {
      res.status(404).json({ error: "Reseña no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la reseña" });
  }
};


// Eliminar una reseña por su ID
const deleteReview = async (req, res) => {
  const { backdrop } = req.params;
  try {
    const deleteReview = await Reviews.findOne({ where: { backdrop } });
    if (deleteReview) {
      await deleteReview.destroy();
      res.json({ message: "Reseña eliminada con éxito" });
    } else {
      res.status(404).json({ error: "Reseña no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la reseña" });
  }
};

module.exports = {
  deleteReview,
  readReview,
  createReview,
  updateReview,
};
