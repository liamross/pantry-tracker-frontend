import uuid from 'uuid';

const pantry = {};

for (let i = 1; i <= 9; i++) {
  const thisId = uuid.v4();
  const recipes = [];
  const notifications = [];

  for (let j = 1; j < i; j++) {
    recipes.push(uuid.v4());
    notifications.push(uuid.v4());
  }

  const item = {
    id: thisId,
    name: `Name ${i}`,
    amount: {
      current: i,
      initial: i + 1,
      unit: i % 2 === 0 ? 'litre(s)' : 'gram(s)',
    },
    expires: new Date(),
    recipes,
    notifications,
  };

  pantry[thisId] = item;
}

export const fetchPantryItemsAPI = (id) => {
  console.log('fetch pantry with id: ', id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pantry);
    }, 2000);
  });
};
