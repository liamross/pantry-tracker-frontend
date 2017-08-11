import { call, put } from 'redux-saga/effects';
import { fetchPantryItemsAPI } from '../api/pantryItems';

// Actions.
// -----------------------------------------------------------------------------

export const FETCH_PANTRY_ITEMS = 'pantryItems/FETCH_PANTRY_ITEMS';

/**
 * Action creator for fetching all pantry items for a user id.
 * @param {String} id - User id to fetch relevant pantry items.
 * @returns {Object}
 */
export const fetchPantryItems = userId => ({
  type: FETCH_PANTRY_ITEMS,
  userId,
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

// TODO: add action creator for patch pantry items

// TODO: success case

// TODO: failure case

const ADD_QUEUED_REQUEST = 'pantryItems/ADD_QUEUED_REQUEST';
const addQueuedRequest = pantryItemId => ({
  type: ADD_QUEUED_REQUEST,
  pantryItemId,
});

const REMOVE_QUEUED_REQUEST = 'pantryItems/REMOVE_QUEUED_REQUEST';
const removeQueuedRequest = pantryItemId => ({
  type: REMOVE_QUEUED_REQUEST,
  pantryItemId,
});

// Reducer.
// -----------------------------------------------------------------------------
const defaultState = {
  pantryItems: null,
  error: null,
  requestQueue: [],
};

export default function pantry(state = defaultState, action) {
  switch (action.type) {
    case FETCH_PANTRY_ITEMS_SUCCESS:
      return {
        ...state,
        pantryItems: action.pantryItems,
        error: null,
      };
    case FETCH_PANTRY_ITEMS_FAILURE:
      return {
        ...state,
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
    const pantryItems = yield call(fetchPantryItemsAPI, action.userId);
    yield put(fetchPantryItemsSuccess(pantryItems));
  } catch (error) {
    yield put(fetchPantryItemsFailure(error));
  }
}
