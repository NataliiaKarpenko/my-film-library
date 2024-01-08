import { refs } from '../../refs';

export function createMovieModalMarkup(movie) {
  const {
    id,
    imgSrc,
    title,
    voteAverage,
    vote_count,
    popularityAverage,
    original_title,
    genresString,
    overview,
  } = movie;

  return `    
     <div class="movieModal__container" >
      <button class='close-btn modal-btn'>&#215;</button>
      <div class="movieModal__img-container">
       <img src=${imgSrc} alt=${title} class="movieModal__img"/>
      </div>
      <div class="movieModal__info-container">
       <h1 class="movieModal__title">${title}</h1>
       <div class="movieModal__list-container">
        <ul class= "movieModal__list">
         <li class="movieModal__list-section">
          <ul class="movieModal__item-list">
           <li class="movieModal__item heading">Vote / Votes</li>
           <li class="movieModal__item text">
            <span class="vote-average">${voteAverage}</span>
            <span class="slash">/</span>
            <span>${vote_count}</span>
           </li>
          </ul>
         </li>
         <li class="movieModal__list-section">
          <ul class="movieModal__item-list">
           <li class="movieModal__item heading">Popularity</li>
           <li class="movieModal__item text">${popularityAverage}</li>
          </ul>
         </li>
         <li class="movieModal__list-section">
          <ul class="movieModal__item-list">
           <li class="movieModal__item heading">Original Title</li>
           <li class="movieModal__item text">${original_title}</li>
          </ul>
         </li>
         <li class="movieModal__list-section">
          <ul class="movieModal__item-list">
           <li class="movieModal__item heading">Genre</li>
           <li class="movieModal__item text">${genresString}</li>
          </ul>
         </li>
        </ul>
       </div>
       <div class="movieModal__about-container">
        <h2 class="movieModal__subtitle">About<h2>
        <p class="movieModal__description">${overview}<p>
       </div> 

       <div class="movieModal__btn-container">
         ${createButtonMarkup(id)}
       </div>
      </div>
     </div>           
`;
}

function createButtonMarkup(id) {
  let buttonMarkup;
  if (refs.homeLink.classList.contains('active-link'))
    buttonMarkup = `<button class="movieModal__btn firstBtn" id="queue-btn">Add to queue</button>
        <button class="movieModal__btn secondBtn" id="watched-btn">Add to watched</button>`;
  else {
    if (refs.queueBtn.classList.contains('active-button')) {
      buttonMarkup = `<button class="movieModal__btn firstBtn" id="watched-btn" data-movie-id=${id}>Add to watched</button>
        <button class="movieModal__btn secondBtn" id="delete-btn" data-movie-id=${id}>Delete</button>`;
    } else if (refs.watchedBtn.classList.contains('active-button')) {
      buttonMarkup = `<button class="movieModal__btn firstBtn" id="queue-btn" data-movie-id=${id}>Add to queue</button>
          <button class="movieModal__btn secondBtn" id="delete-btn" data-movie-id=${id}>Delete</button>`;
    }
  }

  return buttonMarkup;
}
