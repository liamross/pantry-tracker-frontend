import uuid from 'uuid';

const pantry = [];

for (let i = 1; i <= 9; i++) {
  const item = {
    id: uuid.v4(),
    name: `Name ${i}`,
    amount: {
      current: i,
      initial: i + 1,
      unit: 'litre',
    },
    expires: new Date(),
    recipes: [],
    notifications: [],
  };

  for (let j = 0; j < i - 1; j++) {
    item.recipes.push(j);
    item.notifications.push(j);
  }
  pantry.push(item);
}

export const fetchPantryItemsAPI = (id) => {
  console.log('fetch pantry with id: ', id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pantry);
    }, 2000);
  });
};
