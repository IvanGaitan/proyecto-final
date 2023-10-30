import React, { useEffect, useState } from "react";
import "./MovieModal.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import CancelIcon from "@material-ui/icons/Cancel";
import { Review } from "../../services/reviews";

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalVisibility,
}) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [trailerUrl, setTrailerUrl] = useState("");
  let [calificacion, setCalification] = useState("");
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const randomPorcentaje = () => {
    return Math.floor(Math.random() * 100);
  };
  useEffect(() => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(title || name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
    let parts = backdrop_path.split("/");
    let filename = parts[parts.length - 1];
    let filenameF = filename.split(".")[0];
    handleGetReview(filenameF);
  }, []);

  const [puntuacion, setPuntuacion] = useState(5);

  const handlePuntuacionChange = (event) => {
    setPuntuacion(Number(event.target.value));
  };

  const handleGetReview = async (backdrop) => {
    try {
      console.log(backdrop);
      const newReview = await Review.getReviews(backdrop);
      console.log("1", newReview);
      console.log("2", newReview.calificacion);
      setCalification(newReview.calificacion);
      console.log("datos traidos:", newReview);
    } catch (error) {
      console.error("Error al traer la reseña:", error);
    }
  };

  const handleCreateReview = async (title, backdrop_path) => {
    let parts = backdrop_path.split("/");
    let filename = parts[parts.length - 1];
    let filenameF = filename.split(".")[0];
    try {
      const reviewData = {
        titulo: title,
        backdrop: filenameF,
        calificacion: puntuacion,
      };
      console.log(reviewData);

      const newReview = await Review.createReview(reviewData);

      console.log("Nueva reseña creada:", newReview);
    } catch (error) {
      console.error("Error al crear la reseña:", error);
    }
  };

  const handleUpdateReview = async (title, backdrop_path) => {
    let parts = backdrop_path.split("/");
    let filename = parts[parts.length - 1];
    let filenameF = filename.split(".")[0];

    const reviewData = {
      titulo: title,
      calificacion: puntuacion,
    };

    try {
      const response = await Review.updateReview(filenameF, reviewData);
      console.log("Nueva reseña creada:", response);
    } catch (error) {
      console.error("Error al actualizar la reseña:", error);
    }
  };

  const handleDeleteReview = async (backdrop_path) => {
    let parts = backdrop_path.split("/");
    let filename = parts[parts.length - 1];
    let filenameF = filename.split(".")[0];
    try {
      const response = await Review.deleteReview(filenameF);
      console.log("reseña eliminada:", response);
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
    }
  };

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span
            onClick={() => setModalVisibility(false)}
            className="modal-close"
          >
            <CancelIcon />
          </span>
          {trailerUrl ? (
            <Youtube videoId={trailerUrl} opts={opts} />
          ) : (
            <img
              className="modal__poster-img"
              src={`${base_url}${backdrop_path}`}
            />
          )}
          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">
                {randomPorcentaje()}% for you
              </span>{" "}
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>

            <p className="modal__overview">{overview}</p>
            <p className="modal__overview">Promedio de votos: {vote_average}</p>
            <p className="modal__overview">
              Calificación: {calificacion ? calificacion : "No calificado"}
            </p>
          </div>
          <div className="modal__btn modal__content row">
            <p className="modal__overview">Califica la pelicula:</p>
            <div className="puntua-div">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={`rating_${value}`} className="puntua-div-in">
                  <input
                    type="radio"
                    id={`puntuacion_${value}`}
                    name="puntuacion"
                    value={value}
                    checked={puntuacion === value}
                    onChange={handlePuntuacionChange}
                  />
                  <label
                    htmlFor={`puntuacion_${value}`}
                    className="puntua-lavel"
                  >
                    {value}
                  </label>
                </div>
              ))}
            </div>
            <div>
              {calificacion ? (
                <div>
                  <button
                    className="banner__buttons"
                    onClick={() =>
                      handleUpdateReview(title ? title : name, backdrop_path)
                    }
                  >
                    Modificar reseña
                  </button>
                  <button
                    className="banner__buttons delete"
                    onClick={() =>
                      handleDeleteReview(backdrop_path)
                    }
                  >
                    Eliminar reseña
                  </button>
                </div>
              ) : (
                <button
                  className="banner__buttons"
                  onClick={() =>
                    handleCreateReview(title ? title : name, backdrop_path)
                  }
                >
                  Enviar reseña
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
