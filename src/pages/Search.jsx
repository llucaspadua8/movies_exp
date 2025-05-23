import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import "./MoviesGrid.css"

const apiKey = import.meta.env.VITE_API_KEY;
const searchURL = import.meta.env.VITE_SEARCH;


const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [movies, setMovies] = useState([]);

  const getSearchedMovies = async (url) => { // faz requisiçao para api pela URL
    const res = await fetch(url); // espera resposta da api
    const data = await res.json(); // armazena em "data" um array de objetos JS (json)

    setMovies(data.results);
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
    getSearchedMovies(searchWithQueryURL);
  }, [query]); //executa 2 vezes baseado na query


    return (
      <div className="container">
        <h2 className="title">
          Resultados para: <span className="query-text">{query}</span>
        </h2>
        <div className="movies-container">
          {movies.length > 0 &&
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    );
};
  
export default Search;