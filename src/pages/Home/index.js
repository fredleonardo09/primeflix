import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";

import './home.css'

//URL DA API: /movie/now_playing?api_key=6b1dd7a14ed8df9abe35e0ba6b3355c2&language=pt-br


function Home() {
  const [movie, setMovies ] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    async function loadMovie(){
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "6b1dd7a14ed8df9abe35e0ba6b3355c2",
          language: "pt-Br",
          page: 1,
        },
      });

      //console.log(response.data.results.slice(0,10))
      setMovies(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadMovie();

  }, [])


  if(loading){
    return(
      <div className='loading'>
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='lista-filmes'>
        {movie.map((movie) => {
          return(
            <article key={movie.id}>
              <strong> {movie.title} </strong>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
              <Link to={`/movie/${movie.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
        
    </div>
  )
}

export default Home;