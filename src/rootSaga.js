import { all, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  FETCH_PANTRY_ITEMS,
  fetchPantryItemsSaga,
  SAVE_PANTRY_ITEM,
  savePantryItemSaga,
} from './redux/pantryItems';

export default function* sagas() {
  yield all([
    fork(
      takeLatest,
      FETCH_PANTRY_ITEMS,
      fetchPantryItemsSaga,
    ),
    fork(
      takeEvery,
      SAVE_PANTRY_ITEM,
      savePantryItemSaga,
    ),
  ]);
}
