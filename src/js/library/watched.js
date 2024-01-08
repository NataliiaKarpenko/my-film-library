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
import { getMoreQueueCollection } from './queue';
import {
  addClass,
  disableButton,
  enableButton,
  hideElement,
  removeClass,
  showElement,
} from '../common-methods';

import shelfDesktop1 from '../../images/shelf/shelf-desktop.png';
import shelfDesktop2 from '../../images/shelf/shelf-desktop@2x.png';
import shelfTab1 from '../../images/shelf/shelf-tab.png';
import shelfTab2 from '../../images/shelf/shelf-tab@2x.png';
import shelfMob1 from '../../images/shelf/shelf-mob.png';
import shelfMob2 from '../../images/shelf/shelf-mob@2x.png';
import { createGenresArr } from '../gallery-container/create -genres-arrey';

export const updateUIForNoMoviesInWatched = () => {
  hideElement(refs.paginationBlock);
  enableButton(refs.queueBtn);
  let imageText = `There are no movies in your watched yet`;
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

  refs.watchedBtn.removeEventListener('click', handleBtnClickUnauthorised);
  refs.watchedBtn.removeEventListener('click', getWatchedCollection);

  refs.watchedBtn.addEventListener('click', handleWatchedBtnClick);
};

export function handleWatchedBtnClick() {
  Notify.info("You haven't added a movie to your watched yet");

  addClass(refs.watchedBtn, 'active-button');
  removeClass(refs.queueBtn, 'active-button');
}

export async function getWatchedCollection() {
  paginationLibrary.off('afterMove', getMoreQueueCollection);

  paginationLibrary.on('afterMove', getMoreWatchedCollection);

  sessionStorage.removeItem('currentPageLibraryQueue');
  addClass(refs.watchedBtn, 'active-button');
  removeClass(refs.queueBtn, 'active-button');
  hideElement(refs.paginationBlock);

  try {
    spinnerStart();
    const storedPageWatched = sessionStorage.getItem(
      'currentPageLibraryWatched'
    );
    const initialPageWatched = storedPageWatched
      ? parseInt(storedPageWatched, 10)
      : 1;

    const user = auth.currentUser;

    onSnapshot(doc(db, 'users', user.uid), doc => {
      enableButton(refs.queueBtn);
      const currentWatched = doc.data()?.watched || [];

      const { total_results, results } =
        currentWatched[initialPageWatched - 1] || [];

      if (results) {
        paginationLibrary.reset(total_results);

        paginationLibrary.movePageTo(initialPageWatched);
        disableButton(refs.watchedBtn);

        if (currentWatched.length > 1) showElement(refs.paginationBlock);
        else hideElement(refs.paginationBlock);
      } else {
        if (currentWatched.length > 0) {
          const newCurrentPage = currentWatched.length;
          const newTotalResults = newCurrentPage * 9;
          paginationLibrary.reset(newTotalResults);
          paginationLibrary.movePageTo(newCurrentPage);

          currentWatched.length > 1
            ? showElement(refs.paginationBlock)
            : hideElement(refs.paginationBlock);
        } else {
          updateUIForNoMoviesInWatched();
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

export async function getMoreWatchedCollection(event) {
  const currentPage = event.page;

  try {
    spinnerStart();

    const user = auth.currentUser;

    onSnapshot(doc(db, 'users', user.uid), doc => {
      const { results } = doc.data().watched?.[currentPage - 1] || [];

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

      sessionStorage.setItem('currentPageLibraryWatched', currentPage);

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
