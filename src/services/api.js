import axios from "axios";

//BASE DA URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=6b1dd7a14ed8df9abe35e0ba6b3355c2&language=pt-br

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

export default api;