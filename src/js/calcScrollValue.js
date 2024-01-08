const calcScrollValue = () => {
  let scrollProgress = document.getElementById('progress');

  let pos = document.documentElement.scrollTop;

  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  let scrollValue = Math.round((pos * 100) / calcHeight);

  if (pos > 100) {
    scrollProgress.style.scale = '100%';
  } else {
    scrollProgress.style.scale = '0';
  }
  scrollProgress.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = document.body.classList.contains(
    'dark-theme'
  )
    ? `conic-gradient(var(--accent-color ) ${scrollValue}%, var(--body-color) ${scrollValue}%)`
    : `conic-gradient(var(--accent-color ) ${scrollValue}%, var(--header-font-color) ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
