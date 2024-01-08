import * as basicLightbox from 'basiclightbox';
import { Notify } from 'notiflix';

import { TMDBApi } from '../../api';
import { refs } from '../../refs';
import { posterUrl } from '../../gallery-container/create-movies-list';
import { auth } from '../auth-modals/firebase';
import { handleEscBtnPress } from '../auth-modals/handleEscBtnPress';
import { createMovieModalMarkup } from './movie-modal-mark-up';
import { addMovieToStore } from './add-movie-to-store';
import noImage from '../../../images/no-image.png';
import { deleteMovieFromStore } from './delete-movie-from-store';

const tmdbApi = new TMDBApi();

let movieModal;

refs.moviesList.addEventListener('click', function (event) {
  const clickedLink = event.target.closest('.movie__item');
  if (clickedLink) {
    const movieId = clickedLink.dataset.movieId;

    getMovieDetails(movieId);
  }
});

async function getMovieDetails(movieId) {
  try {
    const { data } = await tmdbApi.fetchMovieDetails(movieId);

    const {
      id,
      poster_path,
      title,
      original_title,
      vote_average,
      vote_count,
      popularity,
      genres,
      overview,
      release_date,
    } = data;

    const imgSrc = poster_path ? `${posterUrl}${poster_path}` : `${noImage}`;
    const genresArr = genres.map(genre => genre.name);
    const genresString = genresArr.join(', ');
    const voteAverage = vote_average.toFixed(1);
    const popularityAverage = popularity.toFixed(1);
    const releaseYear = release_date
      ? new Date(release_date).getFullYear()
      : 'No info about release date';

    const movie = {
      id,
      imgSrc,
      title,
      voteAverage,
      vote_count,
      popularityAverage,
      original_title,
      genresString,
      overview,
      releaseYear,
    };

    const movieModalContent = createMovieModalMarkup(movie);

    movieModal = basicLightbox.create(movieModalContent, {
      onShow: () => {
        setUpMovieModal(movie);
      },
      onClose: () => {
        document.body.classList.remove('modal-open');
      },
    });

    movieModal.show();
  } catch (e) {
    console.log(e);
  }
}

function setUpMovieModal(movie) {
  const user = auth.currentUser;
  const queueBtn = movieModal.element().querySelector('#queue-btn')
    ? movieModal.element().querySelector('#queue-btn')
    : null;
  const watchedBtn = movieModal.element().querySelector('#watched-btn')
    ? movieModal.element().querySelector('#watched-btn')
    : null;
  const closeBtn = movieModal.element().querySelector('.modal-btn');
  const deleteBtn = movieModal.element().querySelector('#delete-btn')
    ? movieModal.element().querySelector('#delete-btn')
    : null;

  closeBtn.onclick = movieModal.close;

  document.addEventListener('keydown', e => handleEscBtnPress(e, movieModal));

  changeBtnStatus(user, queueBtn, watchedBtn);

  document.body.classList.add('modal-open');

  if (queueBtn) {
    queueBtn.onclick = e => {
      addMovieToStore(
        e,
        user,
        movie,
        movieModal,
        'queue',
        'watched',
        deleteBtn
      );
    };
  }

  if (watchedBtn) {
    watchedBtn.onclick = e => {
      addMovieToStore(
        e,
        user,
        movie,
        movieModal,
        'watched',
        'queue',
        deleteBtn
      );
    };
  }

  if (deleteBtn && queueBtn) {
    deleteBtn.addEventListener('click', e => {
      deleteMovieFromStore(e, movieModal, 'watched');
      Notify.success(
        'The movie has successfully been deleted from the watched'
      );
    });
  }

  if (deleteBtn && watchedBtn) {
    deleteBtn.addEventListener('click', e => {
      deleteMovieFromStore(e, movieModal, 'queue');
      Notify.success('The movie has successfully been deleted from the queue');
    });
  }
}

function changeBtnStatus(user, queueBtn, watchedBtn) {
  if (queueBtn) {
    if (user) {
      queueBtn.disabled = false;
    } else {
      console.log(user);
      Notify.info('Sign up or sign in to use your library');
      queueBtn.disabled = true;
      queueBtn.style.backgroundColor = 'var(--header-font-color)';
      queueBtn.style.border = '1px solid #8c8c8c';
      queueBtn.style.color = '#8c8c8c';

      watchedBtn.disabled = true;
      watchedBtn.style.backgroundColor = 'var(--header-font-color)';
      watchedBtn.style.border = '1px solid #8c8c8c';
      watchedBtn.style.color = '#8c8c8c';
    }
  }
}
