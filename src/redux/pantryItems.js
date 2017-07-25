import { call, put } from 'redux-saga/effects';
import { fetchPantryItemsAPI } from '../api/pantryItems';

// Action types.
// -----------------------------------------------------------------------------
export const FETCH_PANTRY_ITEMS = 'pantryItems/FETCH_PANTRY_ITEMS';
const FETCH_PANTRY_ITEMS_SUCCESS = `${FETCH_PANTRY_ITEMS}_SUCCESS`;
const FETCH_PANTRY_ITEMS_FAILURE = `${FETCH_PANTRY_ITEMS}_FAILURE`;
const RESET_PANTRY_ERROR = 'pantryItems/RESET_PANTRY_ERROR';

// Actions.
// -----------------------------------------------------------------------------
export const fetchPantryItems = id => ({
  type: FETCH_PANTRY_ITEMS,
  id,
});

const fetchPantryItemsSuccess = pantryItems => ({
  type: FETCH_PANTRY_ITEMS_SUCCESS,
  pantryItems,
});

const fetchPantryItemsFailure = error => ({
  type: FETCH_PANTRY_ITEMS_FAILURE,
  error,
});

const resetPantryError = () => ({
  type: RESET_PANTRY_ERROR,
});

// Reducer.
// -----------------------------------------------------------------------------
const defaultState = {
  pantryItems: [],
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
    case RESET_PANTRY_ERROR:
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
    yield put(resetPantryError());
    const pantryItems = yield call(fetchPantryItemsAPI, action.id);
    yield put(fetchPantryItemsSuccess(pantryItems));
  } catch (error) {
    yield put(fetchPantryItemsFailure(error));
  }
}
