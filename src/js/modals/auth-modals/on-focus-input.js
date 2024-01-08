export function onFocusInput(inputEl, iconEl) {
  inputEl.addEventListener('focus', () => {
    inputEl.style.border = '';
    iconEl.style.color = '';
  });
}
