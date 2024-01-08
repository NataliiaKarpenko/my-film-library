import * as basicLightbox from 'basiclightbox';
import { signInWithEmailAndPassword, validatePassword } from 'firebase/auth';
import { Notify } from 'notiflix';

import { onFocusInput } from './on-focus-input';
import { togglePasswordVisibility } from './toggle-password-visibility';
import { handleEscBtnPress } from './handleEscBtnPress';
import { validateEmail, validatePassword } from './validate-input';
import { createSignModalMarkUp } from './sign-modal-markup';
import { auth } from './firebase';

let signinModal;
const modalContent = createSignModalMarkUp();

export function createSigninModal() {
  signinModal = basicLightbox.create(modalContent, {
    onShow: () => {
      setupSigninModal();
    },

    onClose: () => {
      document.body.classList.remove('modal-open');
    },
  });

  signinModal.show();
}

function setupSigninModal() {
  const signinForm = signinModal.element().querySelector('#sign-form');
  const emailInput = signinModal.element().querySelector('#email-input');
  const emailIcon = signinModal.element().querySelector('#email-icon');
  const emailErrorMessageContainer = signinModal
    .element()
    .querySelector('#email-error');
  const passwordInput = signinModal.element().querySelector('#password-input');
  const passwordIcon = signinModal.element().querySelector('#password-icon');
  const passwordErrorMessageContainer = signinModal
    .element()
    .querySelector('#password-error');
  const passwordToggler = signinModal
    .element()
    .querySelector('#password-toggler');
  const passwordBtn = signinModal.element().querySelector('#password-btn');
  const passwordText = signinModal.element().querySelector('#password-text');
  const closeBtn = signinModal.element().querySelector('.modal-btn');

  signinForm.addEventListener('submit', e =>
    onFormSubmit(
      e,
      signinForm,
      emailInput,
      emailIcon,
      emailErrorMessageContainer,
      passwordInput,
      passwordIcon,
      passwordErrorMessageContainer,
      passwordText
    )
  );

  closeBtn.onclick = signinModal.close;

  onFocusInput(emailInput, emailIcon, emailErrorMessageContainer);

  onFocusInput(passwordInput, passwordIcon, passwordErrorMessageContainer);

  passwordBtn.onclick = () =>
    togglePasswordVisibility(passwordInput, passwordToggler);

  document.addEventListener('keydown', e => handleEscBtnPress(e, signinModal));

  document.body.classList.add('modal-open');
}

function onFormSubmit(
  e,
  signinForm,
  emailInput,
  emailIcon,
  emailErrorMessageContainer,
  passwordInput,
  passwordIcon,
  passwordErrorMessageContainer,
  passwordText
) {
  e.preventDefault();

  const email = emailInput.value.trim();

  const password = passwordInput.value.trim();

  const isEmailValid = validateEmail(
    email,
    emailInput,
    emailIcon,
    emailErrorMessageContainer
  );

  const isPasswordValid = validatePassword(
    password,
    passwordInput,
    passwordIcon,
    passwordErrorMessageContainer,
    passwordText
  );

  if (isEmailValid & isPasswordValid) {
    signInUser(email, password, signinForm);
  }
}

async function signInUser(email, password, signinForm) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    signinModal.close();
    signinForm.reset();
    Notify.success('You have signed in successfully');
  } catch (error) {
    Notify.failure(error.message);
  }
}
