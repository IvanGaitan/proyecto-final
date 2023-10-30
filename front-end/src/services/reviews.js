import axios from "axios";
const urlBackend = "http://localhost:8000";

const Review = {
  getReviews: async (backdrop) => {
    try {
      const response = await axios.get(
        `${urlBackend}/api/getreviews/${backdrop}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createReview: async (data) => {
    try {
      const response = await axios.post(`${urlBackend}/api/createreview`, data);
      return response.data;
    } catch (error) {
      console.error("Error al crear la reseña:", error);
      throw error;
    }
  },
  updateReview: async (backdrop, data) => {
    try {
      const response = await axios.put(
        `${urlBackend}/api/updatereview/${backdrop}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la reseña:", error);
      throw error;
    }
  },
  deleteReview: async (backdrop) => {
    try {
      const response = await axios.delete(
        `${urlBackend}/api/deletereview/${backdrop}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
      throw error;
    }
  },
};

export { Review };
