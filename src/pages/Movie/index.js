import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import api from "../../services/api";

import { toast } from "react-toastify"; 

import './movie.css'

function Movies() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadMovie(){
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "6b1dd7a14ed8df9abe35e0ba6b3355c2",
          language: "pt-Br",
        }
      })
      .then((response)=>{
        setMovie(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log("Filme não encontrado")
        navigate("/", { replace: true });
        return;
      })
    }

    loadMovie();


    return () => {
      console.log("Componente foi desmontado")
    }
  }, [navigate,id])


  function saveMovie(){
    const myList = localStorage.getItem("@primeflix");

    let saveMovie = JSON.parse(myList) || [];

    const hasMovie = saveMovie.some((saveMovie) => saveMovie.id === movie.id);

    if (hasMovie) {
      toast.warn("Esse filme já está na sua lista");
      return;
      
    }

    saveMovie.push(movie);
    localStorage.setItem("@primeflix", JSON.stringify(saveMovie));
    toast.success("Filme salvo com sucesso");

  }

  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando detalhes</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average} / 10</strong>

      <div className="area-button">
        <button onClick={saveMovie}>Salvar</button>
        <button>
          <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
            Trailer
          </a>
        </button>
        <Link to={"/"}>Voltar</Link>

      </div>

    </div>
  );
}

export default Movies;
