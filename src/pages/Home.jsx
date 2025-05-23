import { useState, useEffect } from "react";

import MovieCard from "../components/MovieCard";

import './MoviesGrid.css'


const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);

    const getTopRatedMovies = async (url) => { // faz requisiçao para api pela URL
        const res = await fetch(url); // espera resposta da api
        const data = await res.json(); // armazena em "data" um array de objetos JS (json)

        setTopMovies(data.results);
    };

    useEffect(() => {

        const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
        
        getTopRatedMovies(topRatedUrl);

    }, []);


    return (
    <div className="container">
        <h2 className="title">Melhores filmes:</h2>
        <div className="movies-container">
            {topMovies.length === 0 && <p>Carregando...</p>}
            {topMovies.length > 0 && topMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
        </div>
    </div>
    );
  };
  
export default Home;