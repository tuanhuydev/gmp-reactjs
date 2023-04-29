import { capitalizeObject, movieAdapter } from "../utils/movieHelpers";

class MovieService {
  baseUrl = "http://localhost:4000/movies";

  async fetchMovies(filter) {
    const searchQueries = new URLSearchParams(filter);
    const response = await fetch(`${new URL(this.baseUrl)}?${searchQueries}`);
    const { data = [] } = await response.json();
    return movieAdapter(data);
  }

  async fetchMovie(movieId) {
    if (!movieId) return;
    const response = await fetch(`${new URL(`${this.baseUrl}/${movieId}`)}`);
    const data = await response.json();
    return capitalizeObject(data);
  }
}

const movieService = new MovieService();
export default movieService;
