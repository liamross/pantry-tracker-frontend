import { call, put } from 'redux-saga/effects';
import { fetchPantryItemsAPI } from '../api/pantryItems';

// Actions.
// -----------------------------------------------------------------------------
export const FETCH_PANTRY_ITEMS = 'pantryItems/FETCH_PANTRY_ITEMS';
export const fetchPantryItems = id => ({
  type: FETCH_PANTRY_ITEMS,
  id,
});

const FETCH_PANTRY_ITEMS_SUCCESS = `${FETCH_PANTRY_ITEMS}_SUCCESS`;
const fetchPantryItemsSuccess = pantryItems => ({
  type: FETCH_PANTRY_ITEMS_SUCCESS,
  pantryItems,
});

const FETCH_PANTRY_ITEMS_FAILURE = `${FETCH_PANTRY_ITEMS}_FAILURE`;
const fetchPantryItemsFailure = error => ({
  type: FETCH_PANTRY_ITEMS_FAILURE,
  error,
});

const RESET_PANTRY_ERROR_STATE = 'pantryItems/RESET_PANTRY_ERROR_STATE';
const resetPantryErrorState = () => ({
  type: RESET_PANTRY_ERROR_STATE,
});

// Reducer.
// -----------------------------------------------------------------------------
const defaultState = {
  pantryItems: null,
  error: null,
};
export default function pantry(state = defaultState, action) {
  switch (action.type) {
    case FETCH_PANTRY_ITEMS_SUCCESS:
      return {
        pantryItems: action.pantryItems,
        error: null,
      };
    case FETCH_PANTRY_ITEMS_FAILURE:
      return {
        pantryItems: action.pantryItems,
        error: action.error,
      };
    case RESET_PANTRY_ERROR_STATE:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

// Saga.
// -----------------------------------------------------------------------------
export function* fetchPantryItemsSaga(action) {
  try {
    // Reset error state prior to call in order to restore loading in components
    // that observe error.
    yield put(resetPantryErrorState());
    const pantryItems = yield call(fetchPantryItemsAPI, action.id);
    yield put(fetchPantryItemsSuccess(pantryItems));
  } catch (error) {
    yield put(fetchPantryItemsFailure(error));
  }
}
