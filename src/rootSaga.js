import { fork, takeLatest, all } from 'redux-saga/effects';
import { FETCH_PANTRY_ITEMS, fetchPantryItemsSaga } from './redux/pantryItems';

export default function* sagas() {
  yield all([
    fork(
      takeLatest,
      FETCH_PANTRY_ITEMS,
      fetchPantryItemsSaga,
    ),
  ]);
}
