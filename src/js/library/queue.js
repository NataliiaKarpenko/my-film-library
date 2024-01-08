import { doc, onSnapshot } from 'firebase/firestore';
import { Notify } from 'notiflix';

import { refs } from '../refs';
import { spinnerStart, spinnerStop } from '../loader';
import { auth, db } from '../modals/auth-modals/firebase';
import { createMovie } from '../gallery-container/create-movie-markup';
import { paginationLibrary } from '../pagination';
import { scrollToTop } from '../scrollToTop';
import { createImageNotification } from '../image-notification';
import { handleBtnClickUnauthorised } from './libraryPage';

import shelfDesktop1 from '../../images/shelf/shelf-desktop.png';
import shelfDesktop2 from '../../images/shelf/shelf-desktop@2x.png';
import shelfTab1 from '../../images/shelf/shelf-tab.png';
import shelfTab2 from '../../images/shelf/shelf-tab@2x.png';
import shelfMob1 from '../../images/shelf/shelf-mob.png';
import shelfMob2 from '../../images/shelf/shelf-mob@2x.png';
import {
  addClass,
  disableButton,
  enableButton,
  hideElement,
  removeClass,
  showElement,
} from '../common-methods';
import { getMoreWatchedCollection } from './watched';
import { createGenresArr } from '../gallery-container/create -genres-arrey';

export const updateUIForNoMoviesInQueue = () => {
  sessionStorage.removeItem('currentPageLibraryWatched');
  hideElement(refs.paginationBlock);
  enableButton(refs.queueBtn);
  refs.moviesList.innerHTML = '';
  refs.moviesList.insertAdjacentHTML(
    'afterbegin',
    createImageNotification(
      shelfDesktop1,
      shelfDesktop2,
      shelfTab1,
      shelfTab2,
      shelfMob1,
      shelfMob2,
      imageText
    )
  );

  refs.queueBtn.removeEventListener('click', handleBtnClickUnauthorised);
  refs.queueBtn.removeEventListener('click', getQueueCollection);

  refs.queueBtn.addEventListener('click', handleQueueBtnClick);
};

export function handleQueueBtnClick() {
  Notify.info("You haven't added a movie to your queue yet");

  addClass(refs.queueBtn, 'active-button');
  removeClass(refs.watchedBtn, 'active-button');
}

export async function getQueueCollection() {
  paginationLibrary.off('afterMove', getMoreWatchedCollection);
  paginationLibrary.off('afterMove', getMoreQueueCollection);
  paginationLibrary.on('afterMove', getMoreQueueCollection);

  sessionStorage.removeItem('currentPageLibraryWatched');
  addClass(refs.queueBtn, 'active-button');
  removeClass(refs.watchedBtn, 'active-button');
  hideElement(refs.paginationBlock);

  try {
    const storedPageQueue = sessionStorage.getItem('currentPageLibraryQueue');
    const initialPageQueue = storedPageQueue
      ? parseInt(storedPageQueue, 10)
      : 1;

    spinnerStart();

    const user = auth.currentUser;

    onSnapshot(doc(db, 'users', user.uid), doc => {
      enableButton(refs.watchedBtn);
      const currentQueue = doc.data()?.queue || [];

      const { total_results, results } =
        currentQueue[initialPageQueue - 1] || [];

      if (results) {
        paginationLibrary.reset(total_results);

        paginationLibrary.movePageTo(initialPageQueue);
        disableButton(refs.queueBtn);

        if (currentQueue.length > 1) showElement(refs.paginationBlock);
        else hideElement(refs.paginationBlock);
      } else {
        if (currentQueue.length > 0) {
          const newCurrentPage = currentQueue.length;
          const newTotalResults = newCurrentPage * 9;
          paginationLibrary.reset(newTotalResults);
          paginationLibrary.movePageTo(newCurrentPage);

          currentQueue.length > 1
            ? showElement(refs.paginationBlock)
            : hideElement(refs.paginationBlock);
        } else {
          imageText = `There are no movies in your queue yet`;

          updateUIForNoMoviesInQueue();
        }
      }
    });
  } catch (e) {
    console.log('Error getting cached document:', e);
  } finally {
    setTimeout(() => {
      spinnerStop();
    }, 200);
  }
}

export async function getMoreQueueCollection(event) {
  const currentPage = event.page;

  try {
    spinnerStart();

    const user = auth.currentUser;

    onSnapshot(doc(db, 'users', user.uid), doc => {
      const { results } = doc.data().queue?.[currentPage - 1] || [];

      if (results) {
        const moviesMarkUp = results.map(
          ({ id, img, title, genres, releaseYear, vote }) => {
            const genresArr = genres.split(',');
            const newGenresArr = createGenresArr(genresArr);

            return createMovie(id, img, title, newGenresArr, releaseYear, vote);
          }
        );

        refs.moviesList.innerHTML = moviesMarkUp.join('');
      }

      sessionStorage.setItem('currentPageLibraryQueue', currentPage);

      scrollToTop();
    });
  } catch (e) {
    console.log('Error getting cached document:', e);
  } finally {
    setTimeout(() => {
      spinnerStop();
    }, 200);
  }
}
