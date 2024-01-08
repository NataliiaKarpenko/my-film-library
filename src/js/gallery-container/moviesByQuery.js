import { Notify } from 'notiflix';

import { paginationHome } from '../pagination';
import { refs } from '../refs';
import { tmdbApi } from './create-movies-list';
import { createMoviesList } from './create-movies-list';
import { loadMoreTrendingMovies } from './popular-movies-gallery';
import { spinnerStart, spinnerStop } from '../loader';
import { scrollToTop } from '../scrollToTop';
import { createImageNotification } from '../image-notification';
import { hideElement, showElement } from '../common-methods';

import oopsDesktop1 from '../../images/oops/oops-desktop.png';
import oopsDesktop2 from '../../images/oops/oops-desktop@2x.png';
import oopsTab1 from '../../images/oops/oops-tab.png';
import oopsTab2 from '../../images/oops/oops-tab@2x.png';
import oopsMob1 from '../../images/oops/oops-mob.png';
import oopsMob2 from '../../images/oops/oops-mob@2x.png';

export const storedPageQuery = sessionStorage.getItem('currentPageHomeQuery');
export const initialPageQuery = storedPageQuery
  ? parseInt(storedPageQuery, 10)
  : 1;

refs.searchForm.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  hideElement(refs.paginationBlock);
  paginationHome.off('afterMove', loadMoreTrendingMovies);
  paginationHome.off('afterMove', loadMoreMoviesByQuery);
  paginationHome.on('afterMove', loadMoreMoviesByQuery);
  e.preventDefault();

  sessionStorage.removeItem('currentPageHomePopularMovies');

  refs.moviesList.innerHTML = '';

  const query = e.target.elements.searchQuery.value.trim();

  if (!query) {
    Notify.failure('Enter a key-word, please');
    return;
  }

  loadMoviesByQuery(query, (page = 1));
}

export async function loadMoviesByQuery(query, page) {
  paginationHome.off('afterMove', loadMoreTrendingMovies);
  try {
    spinnerStart();

    const { data } = await tmdbApi.fetchMoviesByQuery(query, page);
    const { total_results } = data;

    if (total_results === 0) {
      document.body.classList.add('alarm-btn-visible');
      sessionStorage.removeItem('userQuery');
      hideElement(refs.paginationBlock);

      let oopsText = 'There are no movies matching your query';
      refs.moviesList.innerHTML = '';
      refs.moviesList.insertAdjacentHTML(
        'afterbegin',
        createImageNotification(
          oopsDesktop1,
          oopsDesktop2,
          oopsTab1,
          oopsTab2,
          oopsMob1,
          oopsMob2,
          oopsText
        )
      );

      return Notify.failure(
        'There are no movies matching your query. Enter another key-word, please'
      );
    }

    sessionStorage.setItem('userQuery', query);
    paginationHome.reset(total_results);
    paginationHome.movePageTo(page);

    setTimeout(() => {
      showElement(refs.paginationBlock);
    }, 300);
  } catch (error) {
    Notify.failure(`${error.message}`);
  } finally {
    setTimeout(() => {
      spinnerStop();
    }, 300);
  }
}

export async function loadMoreMoviesByQuery(event) {
  const currentPage = event.page;
  const storedQuery = sessionStorage.getItem('userQuery');

  try {
    spinnerStart();
    const { data } = await tmdbApi.fetchMoviesByQuery(storedQuery, currentPage);

    const { results } = data;

    createMoviesList(results);
    sessionStorage.setItem('currentPageHomeQuery', currentPage);

    scrollToTop();
  } catch (error) {
    Notify.failure(`${error.message}`);
  } finally {
    setTimeout(() => {
      spinnerStop();
    }, 300);
  }
}
