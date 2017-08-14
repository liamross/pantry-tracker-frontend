/**
 * Fetch all pantry items associated with the id given.
 * @param {String} id - The user's id.
 */
export const fetchPantryItemsAPI = id =>
  new Promise((resolve, reject) => {
    let pantry = null;

    try {
      pantry = JSON.parse(localStorage.getItem(`${id}_pantry`));

      if (pantry === null) {
        setTimeout(() => {
          reject('Unable to fetch pantry items.');
        }, 800);
      }

      setTimeout(() => {
        resolve(pantry);
      }, 800);
    } catch (error) {
      reject('Unable to fetch pantry items: ', error);
    }
  });

/**
 * Patch the pantry items associated with the id given.
 * @param {String} id - The user's id.
 * @param {Object} pantryItem - The pantryItem to patch.
 */
export const patchPantryItemsAPI = (id, pantryItem) =>
  new Promise((resolve, reject) => {
    try {
      const pantry = JSON.parse(localStorage.getItem(`${id}_pantry`));
      localStorage.setItem(`${id}_pantry`, JSON.stringify({
        ...pantry,
        [pantryItem.id]: pantryItem,
      }));

      setTimeout(() => {
        resolve(pantryItem);
      }, 800);
    } catch (error) {
      reject(error);
    }
  });

/**
 * Delete a pantry item from pantry items associated with the id given.
 * @param {String} id - The user's id.
 * @param {String} pantryItemId - The pantryItem id to delete.
 */
export const deletePantryItem = (id, pantryItemId) =>
  new Promise((resolve, reject) => {
    try {
      const pantry = JSON.parse(localStorage.getItem(`${id}_pantry`));
      delete pantry[pantryItemId];
      localStorage.setItem(`${id}_pantry`, JSON.stringify(pantry));

      setTimeout(() => {
        resolve();
      }, 800);
    } catch (error) {
      reject(error);
    }
  });
