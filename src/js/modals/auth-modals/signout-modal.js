import * as basicLightbox from 'basiclightbox';
import { Notify } from 'notiflix';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { handleEscBtnPress } from './handleEscBtnPress';

let signoutModal;

export function createSignoutModal() {
  signoutModal = basicLightbox.create(
    `
  <div id="signout-modal" class="auth">
   <div class="auth__container">
    <button class="close-btn modal-btn">&#215;</button>
    <div class="auth__icon-container">
     <svg width="48" height="48" viewBox="0 0 32 35"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M6.4 12.8V9.6C6.4 4.298 10.698 0 16 0s9.6 4.298 9.6 9.6v3.2h1.6a3.2 3.2 0 0 1 3.2 3.2v12.8a3.2 3.2 0 0 1-3.2 3.2H4.8a3.2 3.2 0 0 1-3.2-3.2V16c0-1.76 1.44-3.2 3.2-3.2h1.6zm8 10.768V27.2h3.2v-3.632a3.205 3.205 0 0 0 1.6-2.771 3.2 3.2 0 1 0-4.815 2.763l.015.008zM11.2 9.6v3.2h9.6V9.6a4.8 4.8 0 1 0-9.6 0z" /></path>
     </svg>
    </div>
    <p class="auth__text">Are you sure you want to sign out?</p>
    <div class="auth__btn-container">
      <button class="auth__btn signout-btn" id="signout-btn" type="button">Sign out</button>
      <button class="auth__btn cancel-btn" id="cancel-btn" type="button">Cancel</button>
    </div>
   </div>
  </div>
`,
    {
      onShow: () => {
        setupSignoutModal();
      },
      onClose: () => {
        document.body.classList.remove('modal-open');
      },
    }
  );
  signoutModal.show();
  document.body.classList.add('modal-open');
}

function setupSignoutModal() {
  const signoutBtn = signoutModal.element().querySelector('#signout-btn');
  const closeBtn = signoutModal.element().querySelector('.modal-btn');
  const cancelBtn = signoutModal.element().querySelector('#cancel-btn');

  signoutBtn.addEventListener('click', e => signoutUser(e));

  closeBtn.onclick = signoutModal.close;
  document.addEventListener('keydown', e => handleEscBtnPress(e, signoutModal));
  cancelBtn.onclick = signoutModal.close;
}

async function signoutUser(e) {
  e.preventDefault();
  try {
    await signOut(auth);

    signoutModal.close();
    Notify.success('You have signed out successfully');
  } catch {
    Notify.failure('An error happened.');
  }
}
