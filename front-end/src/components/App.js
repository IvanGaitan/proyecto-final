import React from 'react';
import Row from "./pages/Row";
import Banner from "./pages/Banner";
import Nav from "./pages/Nav";
import requests from "../services/requests";
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Nav />
      <Banner />

      <Row
        title="Originales de Netflix"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />

      <Row
        title="En Tendencia"
        id="TN"
        fetchUrl={requests.fetchTrending}
      />
      <Row
        title="Las más valoradas"
        id="TR"
        fetchUrl={requests.fetchTopRated}
      />
      <Row
        title="Peliculas de Acción"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Peliculas de Comedia"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        title="Peliculas de Horros"
        id="HM"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        title="Peliculas de Romance"
        id="RM"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        title="Documentales"
        id="DM"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default App;
