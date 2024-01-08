import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Notify } from 'notiflix';

import { db } from '../auth-modals/firebase';
import { deleteMovieFromStore } from './delete-movie-from-store';

const MAX_RESULTS_PER_SECTION = 9;

export async function addMovieToStore(
  e,
  user,
  movie,
  movieModal,
  collection,
  prevCollection,
  deleteBtn
) {
  if (!user) {
    return;
  }

  const { uid } = user;

  const movieInStoreRef = doc(db, 'users', uid);

  try {
    const docSnapshot = await getDoc(movieInStoreRef);

    const currentStore = docSnapshot.data()?.[collection] || [];

    const isInStore = checkIfMovieInStore(currentStore, movie.id);

    if (!isInStore) {
      const updatedStore = updateStore(currentStore, movie);

      await updateDoc(movieInStoreRef, { [collection]: updatedStore });

      movieModal.close();
      if (deleteBtn) {
        Notify.success(
          `The movie has successfully been added to the ${collection} and deleted from the ${prevCollection}`
        );
        deleteMovieFromStore(e, movieModal, prevCollection);
      } else {
        Notify.success(
          `The movie has successfully been added to the ${collection} `
        );
      }
    } else {
      Notify.info(`The movie is already in the ${collection}`);
    }
  } catch (error) {
    console.log(error.message);
  }
}

function checkIfMovieInStore(queue, movieId) {
  return (
    queue.length !== 0 &&
    queue.some(section => section.results.some(result => result.id === movieId))
  );
}

function updateStore(currentStore, movie) {
  const { id, imgSrc, title, genresString, releaseYear, voteAverage } = movie;
  console.log(voteAverage);
  const newResult = {
    id,
    img: imgSrc,
    title,
    genres: genresString,
    releaseYear,
    vote: voteAverage,
  };

  const totalResults = calculateTotalResults(currentStore);
  const totalPages = currentStore.length;

  const availableSection = currentStore.find(
    section => section.results.length < MAX_RESULTS_PER_SECTION
  );

  if (availableSection) {
    return updateExistingSection(
      currentStore,
      availableSection,
      newResult,
      totalResults,
      totalPages
    );
  } else {
    return addNewSection(currentStore, newResult, totalResults, totalPages);
  }
}

function calculateTotalResults(currentStore) {
  return currentStore.reduce(
    (total, section) => total + section.results.length,
    0
  );
}

function updateExistingSection(
  currentStore,
  availableSection,
  newResult,
  totalResults,
  totalPages
) {
  const updatedStore = currentStore.map((section, index) => {
    if (section === availableSection) {
      console.log(section);
      return index === 0
        ? {
            ...section,
            total_results: totalResults + 1,
            results: [newResult, ...section.results],
          }
        : {
            ...section,
            total_results: totalResults + 1,
            results: [getShiftedMovie(currentStore, index), ...section.results],
          };
    } else {
      return index === 0
        ? {
            ...section,
            total_results: totalResults + 1,
            total_pages: totalPages,
            results: [newResult, ...section.results.slice(0, 8)],
          }
        : {
            ...section,
            total_results: totalResults + 1,
            results: [
              getShiftedMovie(currentStore, index),
              ...section.results.slice(0, 8),
            ],
          };
    }
  });

  return updatedStore;
}

function addNewSection(currentStore, newResult, totalResults, totalPages) {
  const newSection = {
    page: totalPages === 0 ? 1 : totalPages + 1,
    total_pages: totalPages === 0 ? 1 : totalPages + 1,
    total_results: totalResults + 1,
    results: [
      currentStore.length === 0
        ? newResult
        : getLastMovieFromLastSection(currentStore),
    ],
  };

  const updatedStore =
    currentStore.length === 0
      ? [newSection]
      : [
          ...currentStore.map((section, index) => {
            if (index === 0) {
              return {
                ...section,
                total_results: totalResults + 1,
                total_pages: totalPages + 1,
                results: [newResult, ...section.results.slice(0, 8)],
              };
            } else {
              return {
                ...section,
                total_results: totalResults + 1,
                total_pages: totalPages + 1,
                results: [
                  getShiftedMovie(currentStore, index),
                  ...section.results.slice(0, 8),
                ],
              };
            }
          }),
          newSection,
        ];
  return updatedStore;
}

function getShiftedMovie(currentStore, index) {
  const prevSection = currentStore[index - 1];
  return prevSection.results[8];
}

function getLastMovieFromLastSection(currentStore) {
  const lastMovie = currentStore[currentStore.length - 1]?.results[8];
  return lastMovie || null;
}
