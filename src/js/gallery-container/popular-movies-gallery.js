import { Notify } from 'notiflix';

import { paginationHome } from '../pagination';
import { tmdbApi } from './create-movies-list';
import { createMoviesList } from './create-movies-list';
import { spinnerStart, spinnerStop } from '../loader';
import { refs } from '../refs';
import { scrollToTop } from '../scrollToTop';
import {
  addClass,
  hideElement,
  removeClass,
  showElement,
} from '../common-methods';
import {
  initialPageQuery,
  loadMoreMoviesByQuery,
  loadMoviesByQuery,
} from './moviesByQuery';

const storedQuery = sessionStorage.getItem('userQuery');
addClass(refs.homeLink, 'active-link');
removeClass(refs.libraryLink, 'active-link');
sessionStorage.removeItem('currentPageLibraryQueue');
sessionStorage.removeItem('currentPageLibraryWatched');

if (storedQuery) {
  refs.searchInput.value = storedQuery;
  paginationHome.off('afterMove', loadMoreTrendingMovies);
  loadMoviesByQuery(storedQuery, initialPageQuery);
  paginationHome.on('afterMove', loadMoreMoviesByQuery);
} else {
  paginationHome.off('afterMove', loadMoreMoviesByQuery);
  paginationHome.on('afterMove', loadMoreTrendingMovies);
  createPopularMoviesGallery();
}

refs.homeLink.addEventListener('click', () => {
  sessionStorage.removeItem('currentPageHomePopularMovies');
  sessionStorage.removeItem('currentPageHomeQuery');
  sessionStorage.removeItem('userQuery');
});

async function createPopularMoviesGallery() {
  hideElement(refs.paginationBlock);

  const storedPagePopularMovies = sessionStorage.getItem(
    'currentPageHomePopularMovies'
  );
  const initialPagePopularMovies = storedPagePopularMovies
    ? storedPagePopularMovies
    : 1;

  try {
    spinnerStart();

    const { data } = await tmdbApi.fetchPopularMovies(initialPagePopularMovies);
    const { total_results } = data;

    paginationHome.reset(total_results);
    paginationHome.movePageTo(initialPagePopularMovies);

    setTimeout(() => {
      showElement(refs.paginationBlock);
    }, 300);
  } catch (error) {
    hideElement(refs.paginationBlock);
    Notify.failure(`${error.message}`);
  } finally {
    setTimeout(() => {
      spinnerStop();
    }, 200);
  }
}

export async function loadMoreTrendingMovies(event) {
  const currentPage = event.page;

  try {
    spinnerStart();

    const { data } = await tmdbApi.fetchPopularMovies(currentPage);
    const { results } = data;

    createMoviesList(results);

    sessionStorage.setItem('currentPageHomePopularMovies', currentPage);

    scrollToTop();
  } catch (err) {
    hideElement(refs.paginationBlock);
    Notify.failure(`${err.message}`);
  } finally {
    setTimeout(() => {
      spinnerStop();
    }, 200);
  }
}
