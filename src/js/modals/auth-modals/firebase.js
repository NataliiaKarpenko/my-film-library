import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCJsEtglCMJhoCzaCYwdYSlFtNf_1ojRS8',
  authDomain: 'movie-gallery-89b16.firebaseapp.com',
  projectId: 'movie-gallery-89b16',
  appId: '1:147642855221:web:17399568d24e8d01e0e67c',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
