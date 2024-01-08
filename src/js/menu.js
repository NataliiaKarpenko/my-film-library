import { refs } from './refs';
document.addEventListener('DOMContentLoaded', function () {
  const homeLinkClassName = refs.homeLink.classList.contains('active-link')
    ? 'active-link'
    : '';

  const libraryLinkClassName = refs.libraryLink.classList.contains(
    'active-link'
  )
    ? 'active-link'
    : '';

  const pushbarScript = document.createElement('script');

  pushbarScript.src =
    'https://cdn.jsdelivr.net/npm/pushbar.js@1.0.0/src/pushbar.min.js';

  document.body.appendChild(pushbarScript);

  pushbarScript.onload = function () {
    const pushbar = new Pushbar({
      blur: false,
      overlay: true,
    });

    pushbar.open('mypushbar');

    pushbar.close();

    handlePushbar(pushbar);

    window.addEventListener('resize', () => handlePushbar(pushbar));
  };

  function handlePushbar(pushbar) {
    const width = window.innerWidth;

    if (width > 767) {
      pushbar.close();
    }
  }

  function createMenu() {
    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menu');
    menuContainer.setAttribute('data-pushbar-id', 'mypushbar');
    menuContainer.setAttribute('data-pushbar-direction', 'left');

    const menuContent = `
     <div class="menu__container">
      <div class="menu__upper-container">
       <a href="./index.html" class="nav__logo">
        <svg class="nav__logo-img" width="24" height="24"  viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg">
         <path stroke-linejoin="round" stroke-linecap="round"   stroke-miterlimit="4" stroke-width="2.6667"
         d="M26.427 2.667h-20.853c-1.605 0-2.907 1.301-2.907 2.907v0 20.853c0 1.605 1.301 2.907 2.907 2.907v0h20.853c1.605 0 2.907-1.301 2.907-2.907v0-20.853c0-1.605-1.301-2.907-2.907-2.907v0zM9.333 2.667v26.667M22.667 2.667v26.667M2.667 16h26.667M2.667 9.333h6.667M2.667 22.667h6.667M22.667 22.667h6.667M22.667 9.333h6.667">
         </path>
        </svg>
       </a>
       <button class='close-btn menu-btn' data-pushbar-close>&#215;</button>
      </div>
      <ul class="menu__list">
        <li class="menu__item">
         <a href="./" class="menu__link ${homeLinkClassName}" id="menu__home-link">Home</a>
        </li>
        <li class="menu__item">
         <a href="./library.html" class="menu__link ${libraryLinkClassName}">My library</a>
        </li>
      </ul>
      <button class="theme-button">
        <i class="bx bx-moon theme-button__icon" id="menu-theme-button"></i>
      </button>
     </div>
  `;

    menuContainer.innerHTML = menuContent;

    document.body.appendChild(menuContainer);
  }

  createMenu();

  const homeLink = document.querySelector('#menu__home-link');

  homeLink.addEventListener('click', () => {
    sessionStorage.removeItem('currentPageHomePopularMovies');
    sessionStorage.removeItem('currentPageHomeQuery');
    sessionStorage.removeItem('userQuery');
  });

  const themeButton = document.getElementById('menu-theme-button');
  const darkTheme = 'dark-theme';
  const iconTheme = 'bx-sun';
  const selectedTheme = localStorage.getItem('selected-theme');
  const selectedIcon = localStorage.getItem('selected-icon');

  const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? 'dark' : 'light';

  const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? 'bx bx-sun' : 'bx bx-moon';

  if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
      darkTheme
    );
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'remove' : 'add'](
      iconTheme
    );
  }

  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
});
