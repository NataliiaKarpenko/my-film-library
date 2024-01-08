import * as basicLightbox from 'basiclightbox';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Notify } from 'notiflix';

import { validateEmail, validatePassword } from './validate-input';
import { onFocusInput } from './on-focus-input';
import { togglePasswordVisibility } from './toggle-password-visibility';
import { handleEscBtnPress } from './handleEscBtnPress';
import { auth } from './firebase';
import { db } from './firebase';
import { createSignModalMarkUp } from './sign-modal-markup';

let signupModal;
const signupBtnText = true;
const modalContent = createSignModalMarkUp(signupBtnText);

export function createSignupModal() {
  signupModal = basicLightbox.create(modalContent, {
    onShow: () => {
      setupSignupModal();
    },
    onClose: () => {
      document.body.classList.remove('modal-open');
    },
  });

  signupModal.show();
}

function setupSignupModal() {
  const signupForm = signupModal.element().querySelector('#sign-form');
  const emailInput = signupModal.element().querySelector('#email-input');
  const passwordInput = signupModal.element().querySelector('#password-input');
  const emailIcon = signupModal.element().querySelector('#email-icon');
  const passwordIcon = signupModal.element().querySelector('#password-icon');
  const emailErrorMessageContainer = signupModal
    .element()
    .querySelector('#email-error');
  const passwordErrorMessageContainer = signupModal
    .element()
    .querySelector('#password-error');
  const passwordToggler = signupModal
    .element()
    .querySelector('#password-toggler');
  const passwordBtn = signupModal.element().querySelector('#password-btn');
  const passwordText = signupModal.element().querySelector('#password-text');
  const closeBtn = signupModal.element().querySelector('.modal-btn');

  signupForm.addEventListener('submit', e =>
    onFormSubmit(
      e,
      signupForm,
      emailInput,
      emailIcon,
      emailErrorMessageContainer,
      passwordInput,
      passwordIcon,
      passwordErrorMessageContainer,
      passwordText
    )
  );

  closeBtn.onclick = signupModal.close;

  onFocusInput(emailInput, emailIcon, emailErrorMessageContainer);
  onFocusInput(passwordInput, passwordIcon);

  passwordBtn.onclick = () =>
    togglePasswordVisibility(passwordInput, passwordToggler);

  document.addEventListener('keydown', e => handleEscBtnPress(e, signupModal));

  document.body.classList.add('modal-open');
}

function onFormSubmit(
  e,
  signupForm,
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

  if (isEmailValid && isPasswordValid) {
    signUpUser(email, password, signupForm);
  }
}

async function signUpUser(email, password, signupForm) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'users', cred.user.uid), {
      queue: [],
      watched: [],
    });

    signupModal.close();
    signupForm.reset();
    Notify.success('You have signed up successfully');
  } catch (error) {
    Notify.failure(error.message);
  }
}
