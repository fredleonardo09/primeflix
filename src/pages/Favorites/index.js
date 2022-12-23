import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify"; 

import "./favorites.css";

function Favorites() {
   const [movie, setMovies] = useState([]);

   useEffect(() => {

    const myList = localStorage.getItem("@primeflix");
    setMovies(JSON.parse(myList) || []);
    
   }, [])

   function deleteMovie(id) {
     let filterMovie = movie.filter((movie) => {
      return (movie.id !== id)
     })

     setMovies(filterMovie);
     localStorage.setItem("@primeflix", JSON.stringify(filterMovie));
     toast.success("Filme removido com sucesso")
   }
   

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>

      {movie.length === 0 && (
        <span> Você não possui nenhum filme salvo :( </span>
      )}

      <ul>
        {movie.map((movie) => {
          return (
            <li key={movie.id}>
              <span>{movie.title}</span>
              <div>
                <Link to={`/movie/${movie.id}`}>Ver detalhes</Link>
                <button onClick={() => deleteMovie(movie.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
      <Link to={"/"}>Voltar</Link>
    </div>
  );
}

export default Favorites;
