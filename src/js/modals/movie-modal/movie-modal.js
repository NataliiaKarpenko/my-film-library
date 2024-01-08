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
      // if (deleteBtn) {
      //   deleteMovieFromStore(e, movieModal, 'queue');
      // }
    };
  }

  if (deleteBtn && queueBtn) {
    deleteBtn.addEventListener('click', e => {
      deleteMovieFromStore(e, movieModal, 'watched');
      Notify.success(
        'The movie has successfully been deleted from the watched'
      );
    });
    // queueBtn.onclick = e => {
    //   addMovieToStore(user, movie, movieModal, 'queue');
    //   deleteMovieFromStore(e, movieModal, 'watched');
    // };
  }

  if (deleteBtn && watchedBtn) {
    deleteBtn.addEventListener('click', e => {
      deleteMovieFromStore(e, movieModal, 'queue');
      Notify.success('The movie has successfully been deleted from the queue');
    });
    // watchedBtn.onclick = e => {
    //   addMovieToStore(user, movie, movieModal, 'watched');
    //   deleteMovieFromStore(e, movieModal, 'queue');
    // };
    // watchedBtn.addEventListener('click', e => {
    //   addMovieToStore(user, movie, movieModal, 'watched');
    //   deleteMovieFromStore(e, movieModal, 'queue');
    // });
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

// async function deleteMovieFromStore(e) {
//   const user = auth.currentUser;
//   const movieInQueueRef = doc(db, 'users', user.uid);

//   try {
//     let movieId = Number(e.target.getAttribute('data-movie-id'));

//     const docSnapshot = await getDoc(movieInQueueRef);

//     const currentQueue = docSnapshot.data()?.queue || [];

//     const totalResults =
//       currentQueue.length !== 0
//         ? (currentQueue.length - 1) * 9 +
//           currentQueue[currentQueue.length - 1].results.length
//         : 0;

//     let totalPages = currentQueue.length;

//     const sectionToDelete = currentQueue.find(
//       section => section.results.length === 1
//     );

//     const sectionIndex = currentQueue.findIndex(section =>
//       section.results.some(({ id }) => id === movieId)
//     );

//     const movieIndex = currentQueue[sectionIndex].results.findIndex(
//       ({ id }) => id === movieId
//     );
//     let updatedQueue;
//     let nextSection;
//     let shiftedMovie;

//     if (sectionToDelete) {
//       updatedQueue = currentQueue.map((section, id) => {
//         nextSection = currentQueue.length > 1 ? currentQueue[id + 1] : null;

//         shiftedMovie = nextSection ? nextSection.results[0] : null;

//         if (id === sectionIndex) {
//           section.results.splice(movieIndex, 1);

//           if (nextSection) {
//             section.results.push(shiftedMovie);
//           }
//           return {
//             ...section,
//             total_pages: totalPages - 1,
//             total_results: totalResults - 1,
//           };
//         } else {
//           if (id < sectionIndex) {
//             return {
//               ...section,
//               total_pages: totalPages - 1,
//               total_results: totalResults - 1,
//             };
//           } else if (id > sectionIndex && id !== currentQueue.length - 1) {
//             const updatedResults = [
//               ...section.results.slice(1, 9),
//               shiftedMovie,
//             ];
//             return {
//               ...section,
//               total_pages: totalPages - 1,
//               total_results: totalResults - 1,
//               results: updatedResults,
//             };
//           } else {
//             return {
//               ...section,
//               total_pages: totalPages - 1,
//               total_results: totalResults - 1,
//               results: [...section.results.slice(1, section.results.length)],
//             };
//           }
//         }
//       });

//       updatedQueue.splice(currentQueue.length - 1, 1);
//     } else {
//       updatedQueue = currentQueue.map((section, id) => {
//         nextSection = currentQueue.length > 1 ? currentQueue[id + 1] : null;

//         shiftedMovie = nextSection ? nextSection.results[0] : null;

//         if (id === sectionIndex) {
//           section.results.splice(movieIndex, 1);

//           if (nextSection) {
//             section.results.push(shiftedMovie);
//           }
//           return {
//             ...section,

//             total_results: totalResults - 1,
//           };
//         } else {
//           if (id < sectionIndex) {
//             return {
//               ...section,

//               total_results: totalResults - 1,
//             };
//           } else if (id > sectionIndex && id < currentQueue.length - 1) {
//             const updatedResults = [
//               ...section.results.slice(1, 9),
//               shiftedMovie,
//             ];
//             return {
//               ...section,

//               total_results: totalResults - 1,
//               results: updatedResults,
//             };
//           } else {
//             return {
//               ...section,
//               total_results: totalResults - 1,
//               results: [...section.results.slice(1, section.results.length)],
//             };
//           }
//         }
//       });
//     }

//     await updateDoc(movieInQueueRef, {
//       queue: updatedQueue,
//     });
//     movieModal.close();
//   } catch (e) {
//     console.log(e);
//   }
// }
