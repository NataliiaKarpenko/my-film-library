import axios from 'axios';

export class TMDBApi {
  static URL = 'https://api.themoviedb.org/3';
  static API_KEY = '60bdd84997c9f2a4c6cd2341c547ed98';

  #query = '';

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  fetchPopularMovies(page) {
    const request = '/trending/movie/day';

    return axios.get(`${TMDBApi.URL}${request}?`, {
      params: {
        page,
        api_key: TMDBApi.API_KEY,
        language: 'en-US',
      },
    });
  }

  fetchAllGenres() {
    const request = '/genre/movie/list';

    return axios.get(`${TMDBApi.URL}${request}?`, {
      params: { api_key: TMDBApi.API_KEY, language: 'en' },
    });
  }

  fetchMoviesByQuery(query, page) {
    const request = '/search/movie';

    return axios.get(`${TMDBApi.URL}${request}?query=${query}`, {
      params: {
        page,
        api_key: TMDBApi.API_KEY,
        language: 'en-US',
      },
    });
  }

  fetchMovieDetails(id) {
    const request = '/movie/';

    return axios.get(`${TMDBApi.URL}${request}${id}?`, {
      params: {
        api_key: TMDBApi.API_KEY,
        language: 'en-US',
      },
    });
  }
}
