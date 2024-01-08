export function togglePasswordVisibility(passwordInputEl, visiblityIcon) {
  passwordInputEl.type = passwordInputEl.type === 'text' ? 'password' : 'text';
  visiblityIcon.classList.toggle('bxs-hide');
  visiblityIcon.classList.toggle('bxs-show');
}
