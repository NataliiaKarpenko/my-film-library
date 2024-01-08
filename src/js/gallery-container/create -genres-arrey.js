export const createGenresArr = movieGenresArr => {
  if (movieGenresArr && movieGenresArr.length === 1) {
    movieGenresInfo = `${movieGenresArr[0]}`;
  } else if (movieGenresArr && movieGenresArr.length === 2) {
    movieGenresInfo = `${movieGenresArr[0]}, ${movieGenresArr[1]}`;
  } else if (movieGenresArr && movieGenresArr.length > 2) {
    movieGenresInfo = `${movieGenresArr[0]}, ${movieGenresArr[1]}, other`;
  } else movieGenresInfo = 'No info about genres';
  return movieGenresInfo;
};
