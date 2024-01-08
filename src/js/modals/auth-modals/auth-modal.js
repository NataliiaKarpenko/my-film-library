import * as basicLightbox from 'basiclightbox';
import { onAuthStateChanged } from 'firebase/auth';
import { refs } from '../../refs';
import { createSignupModal } from './signup-modal';
import { handleEscBtnPress } from './handleEscBtnPress';
import { createSigninModal } from './signin-modal';
import { auth } from './firebase';
import { createSignoutModal } from './signout-modal';

let authModal;

onAuthStateChanged(auth, user => {
  if (user) {
    refs.authBtn.addEventListener('click', createSignoutModal);
    refs.authBtn.removeEventListener('click', createAuthModal);
  } else {
    refs.authBtn.addEventListener('click', createAuthModal);
    refs.authBtn.removeEventListener('click', createSignoutModal);
  }
});

function createAuthModal() {
  authModal = basicLightbox.create(
    `
<div class="auth">
 <div class="auth__container">
 <button class='close-btn modal-btn'>&#215;</button>
  <div class="auth__icon-container signin-out">
   <svg width="50" height="50" viewBox="0 0 19 24"  xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8v-2c0-3.314 2.686-6 6-6s6 2.686 6 6v0h-3v2h4c1.105 0 2 0.895 2 2v0 8c0 1.105-0.895 2-2 2v0h-14c-1.105 0-2-0.895-2-2v0-8c0-1.1 0.9-2 2-2h1zM9 14.73v2.27h2v-2.27c0.602-0.352 1-0.996 1-1.732 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.736 0.398 1.38 0.991 1.727l0.009 0.005zM7 6v2h6v-2c0-1.657-1.343-3-3-3s-3 1.343-3 3v0z"></path>
   </svg>   
  </div>
  <div class="auth__btn-container">
   <button class="auth__btn signup-btn" id="auth__btn-signup" type="button">Sign up</button>
   <button class="auth__btn signin-btn" id="auth__btn-signin" type="button">Sign in</button>
  </div>
 </div>
</div>
`,
    {
      onShow: () => {
        setupAuthModal();
      },
      onClose: () => {
        document.body.classList.remove('modal-open');
      },
    }
  );
  authModal.show();
}

function setupAuthModal() {
  const closeBtn = authModal.element().querySelector('.modal-btn');
  const signupBtn = authModal.element().querySelector('#auth__btn-signup');
  const signinBtn = authModal.element().querySelector('#auth__btn-signin');

  closeBtn.onclick = authModal.close;

  signupBtn.onclick = openSignupModal;

  signinBtn.onclick = openSigninModal;

  document.addEventListener('keydown', e => handleEscBtnPress(e, authModal));

  document.body.classList.add('modal-open');
}

function openSignupModal() {
  createSignupModal();
  authModal.close();
  document.body.classList.add('modal-open');
}

function openSigninModal() {
  createSigninModal();
  authModal.close();
  document.body.classList.add('modal-open');
}
