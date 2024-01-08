import { refs } from './refs';

export const spinnerStart = () => {
  refs.backdrop.classList.remove('is-hidden');
};

export const spinnerStop = () => {
  refs.backdrop.classList.add('is-hidden');
};
