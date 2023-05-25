import { capitalizeObject, movieAdapter } from '../utils/movieHelpers';

class MovieService {
  baseUrl = 'http://localhost:4000/movies';

  async fetchMovies(filter: any) {
    const searchQueries = new URLSearchParams(filter);
    const response = await fetch(`${new URL(this.baseUrl)}?${searchQueries}`);
    const { data = [], limit, offset, totalAmount } = await response.json();
    return { movies: movieAdapter(data), limit, offset, totalAmount };
  }

  async fetchMovie(movieId: any) {
    if (!movieId) return;
    const response = await fetch(`${new URL(`${this.baseUrl}/${movieId}`)}`);
    const data = await response.json();
    return capitalizeObject(data);
  }
}

const movieService = new MovieService();
export default movieService;
