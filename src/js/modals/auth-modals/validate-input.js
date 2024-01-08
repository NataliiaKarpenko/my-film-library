function validateInput(
  inputEl,
  iconEl,
  errorMessageEl,
  validation,
  errorMessage
) {
  const isValid = validation();
  inputEl.style.border = isValid ? '' : '1px solid var(--error-color)';
  iconEl.style.fill = isValid ? '' : 'var(--error-color)';
  errorMessageEl.style.display = 'block';
  errorMessageEl.textContent = isValid ? '' : errorMessage;
  errorMessage;
  return isValid;
}

export function validateEmail(email, input, icon, errorMessageContainer) {
  const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const errorMessage = email ? 'Enter a valid email' : 'Required';

  return validateInput(
    input,
    icon,
    errorMessageContainer,
    () => emailValidation.test(email),
    errorMessage
  );
}

export function validatePassword(
  password,
  input,
  icon,
  errorMessageContainer,
  passwordMessageEl
) {
  const passwordValidation = password.length >= 6 && !/\s/.test(password);
  const errorMessage = password ? getPasswordErrorMessage() : 'Required';
  passwordMessageEl.style.display = errorMessage ? 'none' : 'block';

  function getPasswordErrorMessage() {
    return password.length < 6
      ? 'Your password is too short'
      : 'Your password must contain no spaces';
  }

  return validateInput(
    input,
    icon,
    errorMessageContainer,
    () => passwordValidation,
    errorMessage
  );
}
