export function createSignModalMarkUp(signupBtnText) {
  let textBtn = signupBtnText ? 'Sign up' : 'Sign in';
  return `<div class="sign-modal">
  <button class="close-btn modal-btn">&#215;</button>
  <form id="sign-form" novalidate class="sign-form">
    <div class="sign email">
      <label for="email" class="sign__label">
        Email
      </label>
      <svg xmlns="http://www.w3.org/2000/svg" class="sign__icon" id="email-icon" viewBox="0 0 32 32" aria-hidden="true" style="position:absolute;overflow:hidden"><path d="M26 23.5v-12a8.408 8.408 0 0 1-1.078 1.031c-2.234 1.719-4.484 3.469-6.656 5.281-1.172.984-2.625 2.188-4.25 2.188h-.031c-1.625 0-3.078-1.203-4.25-2.188-2.172-1.813-4.422-3.563-6.656-5.281A8.411 8.411 0 0 1 2.001 11.5v12c0 .266.234.5.5.5h23c.266 0 .5-.234.5-.5zm0-16.422C26 6.687 26.094 6 25.5 6h-23c-.266 0-.5.234-.5.5 0 1.781.891 3.328 2.297 4.438a980.43 980.43 0 0 1 6.266 4.953c.828.672 2.328 2.109 3.422 2.109h.031c1.094 0 2.594-1.437 3.422-2.109a946.207 946.207 0 0 1 6.266-4.953c1.016-.797 2.297-2.531 2.297-3.859zm2-.578v17c0 1.375-1.125 2.5-2.5 2.5h-23A2.507 2.507 0 0 1 0 23.5v-17C0 5.125 1.125 4 2.5 4h23C26.875 4 28 5.125 28 6.5z"/></symbol></svg>
      
     
      <input
        type="email"
        name="email"
        class="sign__input"
        placeholder="Enter your email"
        id="email-input"
        autocomplete="off"
      />
      <p class="sign__error" id="email-error"></p>
    </div>
    <div class="sign password">
      <label for="password" class="sign__label">
        Password
      </label>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" style="position:absolute;overflow:hidden"  class="sign__icon" id="password-icon"><path
                d="M6.4 12.8V9.6C6.4 4.298 10.698 0 16 0s9.6 4.298 9.6 9.6v3.2h1.6a3.2 3.2 0 0 1 3.2 3.2v12.8a3.2 3.2 0 0 1-3.2 3.2H4.8a3.2 3.2 0 0 1-3.2-3.2V16c0-1.76 1.44-3.2 3.2-3.2h1.6zm8 10.768V27.2h3.2v-3.632a3.205 3.205 0 0 0 1.6-2.771 3.2 3.2 0 1 0-4.815 2.763l.015.008zM11.2 9.6v3.2h9.6V9.6a4.8 4.8 0 1 0-9.6 0z" /></svg>
     
      <input
        type="password"
        name="password"
        class="sign__input"
        placeholder="Enter a password"
        id="password-input"
        autocomplete="off"
      />
      <button type="button" class="sign__btn" id="password-btn">
        <i class="bx bxs-show" id="password-toggler"></i>
      </button>
      <p class="sign__text" id="password-text">Your password should contain more than 5 characters</p>
      <p class="sign__error" id="password-error"></p>
    </div>
    <button type="submit" class="auth__btn submit-btn">
      ${textBtn}
    </button>
  </form>
</div>`;
}
