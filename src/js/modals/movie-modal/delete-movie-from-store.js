import { auth, db } from '../auth-modals/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function deleteMovieFromStore(e, movieModal, collection) {
  const user = auth.currentUser;
  const movieInStoreRef = doc(db, 'users', user.uid);

  try {
    let movieId = Number(e.target.getAttribute('data-movie-id'));

    const docSnapshot = await getDoc(movieInStoreRef);

    const currentStore = docSnapshot.data()?.[collection] || [];
    console.log(currentStore);

    const totalResults = calculateTotalResults(currentStore);

    const totalPages = currentStore.length;

    const sectionToDelete = currentStore.find(
      section => section.results.length === 1
    );

    const sectionIndex = currentStore.findIndex(section =>
      section.results.some(({ id }) => id === movieId)
    );
    console.log(sectionIndex);
    console.log(movieId);
    console.log(currentStore[sectionIndex].results);
    const movieIndex = currentStore[sectionIndex].results.findIndex(
      ({ id }) => id === movieId
    );

    console.log(movieIndex);
    let updatedStore = updateStoreOnMovieDelete(
      currentStore,
      sectionIndex,
      movieIndex,
      totalResults,
      totalPages
    );

    if (sectionToDelete) {
      updatedStore.splice(currentStore.length - 1, 1);
    }

    await updateDoc(movieInStoreRef, {
      [collection]: updatedStore,
    });
    movieModal.close();
    // Notify.success(
    //   `The movie has successfully been deleted from the ${collection}`
    // );
  } catch (e) {
    console.log(e);
  }
}

function updateStoreOnMovieDelete(
  currentStore,
  sectionIndex,
  movieIndex,
  totalResults,
  totalPages
) {
  let updatedStore = currentStore.map((section, id) => {
    nextSection = currentStore.length > 1 ? currentStore[id + 1] : null;

    shiftedMovie = nextSection ? nextSection.results[0] : null;

    if (id === sectionIndex) {
      section.results.splice(movieIndex, 1);

      if (nextSection) {
        section.results.push(shiftedMovie);
      }
      return {
        ...section,
        total_pages: totalPages - 1,
        total_results: totalResults - 1,
      };
    } else {
      if (id < sectionIndex) {
        return {
          ...section,
          total_pages: totalPages - 1,
          total_results: totalResults - 1,
        };
      } else if (id > sectionIndex && id !== currentStore.length - 1) {
        const updatedResults = [...section.results.slice(1, 9), shiftedMovie];
        return {
          ...section,
          total_pages: totalPages - 1,
          total_results: totalResults - 1,
          results: updatedResults,
        };
      } else {
        return {
          ...section,
          total_pages: totalPages - 1,
          total_results: totalResults - 1,
          results: [...section.results.slice(1, section.results.length)],
        };
      }
    }
  });
  return updatedStore;
}

function calculateTotalResults(currentStore) {
  return currentStore.reduce(
    (total, section) => total + section.results.length,
    0
  );
}
