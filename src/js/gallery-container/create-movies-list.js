import { TMDBApi } from '../api';
import { refs } from '../refs';
import noImage from '../../images/no-image.png';
import { createMovie } from './create-movie-markup';
import { createGenresArr } from './create -genres-arrey';

export const tmdbApi = new TMDBApi();
export const posterUrl = 'https://image.tmdb.org/t/p/w400';

export async function createMoviesList(movieArr) {
  try {
    const { data } = await tmdbApi.fetchAllGenres();
    const { genres } = data;

    const moviesMarkUp = movieArr.map(movie => {
      const { id, title, vote_average } = movie;
      const imgSrc = movie.poster_path
        ? `${posterUrl}${movie.poster_path}`
        : `${noImage}`;

      const movieGenresArr = [];

      const releaseYear = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 'No info about release date';

      for (let i = 0; i < movie.genre_ids.length; i += 1) {
        const newGenres = genres.find(genre => genre.id === movie.genre_ids[i]);
        movieGenresArr.push(newGenres.name);
      }
      const movieGenresInfo = createGenresArr(movieGenresArr);

      return createMovie(
        id,
        imgSrc,
        title,
        movieGenresInfo,
        releaseYear,
        vote_average
      );
    });
    refs.moviesList.innerHTML = moviesMarkUp.join('');
  } catch (err) {
    console.log(err);
  }
}
