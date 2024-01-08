import { refs } from '../refs';

export function createMovie(
  id,
  imgSrc,
  title,
  movieGenresInfo,
  releaseYear,
  vote
) {
  const voteAverageStyle = refs.homeLink.classList.contains('active-link')
    ? 'display: none;'
    : 'display: inline-block;';

  return `
      
    <li class="movie__item" data-movie-id=${id} >
      <div class="movie__poster-container">
        <img src=${imgSrc} alt=${title} class="movie__poster" loading="lazy"/> 
      </div>
      <div >
        <h2 class="movie__title">${title}</h2>
        <p class="movie__text">${movieGenresInfo} | ${releaseYear}<span style="${voteAverageStyle}" class="movie__vote">${vote}</span></p>          
      </div>    
    </li>
  `;
}
