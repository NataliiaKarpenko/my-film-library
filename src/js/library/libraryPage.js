import { Notify } from 'notiflix';

import { auth } from '../modals/auth-modals/firebase';
import { refs } from '../refs';
import { onAuthStateChanged } from 'firebase/auth';
import { spinnerStop } from '../loader';
import { createImageNotification } from '../image-notification';
import { getQueueCollection, handleQueueBtnClick } from './queue';
import { getWatchedCollection, handleWatchedBtnClick } from './watched';
import {
  addClass,
  enableButton,
  hideElement,
  removeClass,
} from '../common-methods';

import notAuthorizedDesktop1 from '../../images/not-authorized/not-authorized-desktop.png';
import notAuthorizedDesktop2 from '../../images/not-authorized/not-authorized-desktop@2x.png';
import notAuthorizedTab1 from '../../images/not-authorized/not-authorized-tab.png';
import notAuthorizedTab2 from '../../images/not-authorized/not-authorized-tab@2x.png';
import notAuthorizedMob1 from '../../images/not-authorized/not-authorized-mob.png';
import notAuthorizedMob2 from '../../images/not-authorized/not-authorized-mob@2x.png';

let imageText;
let currentActiveSection = 'queue';

removeClass(refs.homeLink, 'active-link');
addClass(refs.libraryLink, 'active-link');

function switchSection(section) {
  if (currentActiveSection !== section) {
    currentActiveSection = section;

    const inactiveSection =
      currentActiveSection === 'queue' ? 'watched' : 'queue';
    sessionStorage.removeItem(`currentPageLibrary${inactiveSection}`);
  }
}

export function handleBtnClickUnauthorised() {
  Notify.info('To use the library you should sign up or sign in');
}

const onDownLoadPage = () => {
  enableButton(refs.queueBtn);
  enableButton(refs.watchedBtn);
  hideElement(refs.paginationBlock);

  sessionStorage.removeItem('currentPageHomePopularMovies');
  sessionStorage.removeItem('currentPageHomeQuery');
  sessionStorage.removeItem('userQuery');
};

const updateUIForNotAuthorized = () => {
  spinnerStop();
  removeClass(refs.queueBtn, 'active-button');
  removeClass(refs.watchedBtn, 'active-button');
  hideElement(refs.paginationBlock);
  enableButton(refs.queueBtn);

  imageText = 'Sign up or sign in to use your library';

  refs.moviesList.innerHTML = '';
  refs.moviesList.insertAdjacentHTML(
    'afterbegin',
    createImageNotification(
      notAuthorizedDesktop1,
      notAuthorizedDesktop2,
      notAuthorizedTab1,
      notAuthorizedTab2,
      notAuthorizedMob1,
      notAuthorizedMob2,
      imageText
    )
  );

  refs.queueBtn.removeEventListener('click', getQueueCollection);
  refs.watchedBtn.removeEventListener('click', getWatchedCollection);
  refs.queueBtn.removeEventListener('click', handleQueueBtnClick);
  refs.watchedBtn.removeEventListener('click', handleWatchedBtnClick);

  refs.queueBtn.addEventListener('click', handleBtnClickUnauthorised);
  refs.watchedBtn.addEventListener('click', handleBtnClickUnauthorised);
};

onAuthStateChanged(auth, user => {
  onDownLoadPage();

  if (user) {
    const storedPageWatched = sessionStorage.getItem(
      'currentPageLibraryWatched'
    );
    refs.queueBtn.removeEventListener('click', handleBtnClickUnauthorised);
    refs.watchedBtn.removeEventListener('click', handleBtnClickUnauthorised);

    refs.queueBtn.addEventListener('click', () => {
      switchSection('queue');
      getQueueCollection();
    });
    refs.watchedBtn.addEventListener('click', () => {
      switchSection('watched');
      getWatchedCollection();
    });

    if (storedPageWatched) {
      getWatchedCollection();
    } else {
      getQueueCollection();
    }
  } else {
    updateUIForNotAuthorized();
  }
});
