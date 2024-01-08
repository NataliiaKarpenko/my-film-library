export const addClass = (element, className) =>
  element.classList.add(className);
export const removeClass = (element, className) =>
  element.classList.remove(className);

export const hideElement = element => addClass(element, 'visually-hidden');
export const showElement = element => removeClass(element, 'visually-hidden');

export const enableButton = button => (button.disabled = false);
export const disableButton = button => (button.disabled = true);
