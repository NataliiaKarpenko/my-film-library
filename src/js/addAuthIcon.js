import { refs } from './refs';
import { auth } from '../js/modals/auth-modals/firebase';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, user => {
  if (user) {
    refs.authBtn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 19 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 8v-2c0-3.314 2.686-6 6-6s6 2.686 6 6v0h-3v2h4c1.105 0 2 0.895 2 2v0 8c0 1.105-0.895 2-2 2v0h-14c-1.105 0-2-0.895-2-2v0-8c0-1.1 0.9-2 2-2h1zM9 14.73v2.27h2v-2.27c0.602-0.352 1-0.996 1-1.732 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.736 0.398 1.38 0.991 1.727l0.009 0.005zM7 6v2h6v-2c0-1.657-1.343-3-3-3s-3 1.343-3 3v0z"/></svg>';
  } else {
    refs.authBtn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 32 35"  xmlns="http://www.w3.org/2000/svg"><path d="M6.4 12.8V9.6C6.4 4.298 10.698 0 16 0s9.6 4.298 9.6 9.6v3.2h1.6a3.2 3.2 0 0 1 3.2 3.2v12.8a3.2 3.2 0 0 1-3.2 3.2H4.8a3.2 3.2 0 0 1-3.2-3.2V16c0-1.76 1.44-3.2 3.2-3.2h1.6zm8 10.768V27.2h3.2v-3.632a3.205 3.205 0 0 0 1.6-2.771 3.2 3.2 0 1 0-4.815 2.763l.015.008zM11.2 9.6v3.2h9.6V9.6a4.8 4.8 0 1 0-9.6 0z" /></svg>';
  }
});
