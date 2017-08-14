import { call, put } from 'redux-saga/effects';
import { fetchPantryItemsAPI, patchPantryItemsAPI } from '../api/pantryItems';

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

export const SAVE_PANTRY_ITEM = 'pantryItems/SAVE_PANTRY_ITEM';

/**
 * Action creator for adding or editing a pantry item.
 * @param {String} pantryItem - Pantry item to save.
 * @returns {Object}
 */
export const savePantryItem = (id, pantryItem) => ({
  type: SAVE_PANTRY_ITEM,
  id,
  pantryItem,
});

const SAVE_PANTRY_ITEM_SUCCESS = `${SAVE_PANTRY_ITEM}_SUCCESS`;
const savePantryItemSuccess = pantryItem => ({
  type: SAVE_PANTRY_ITEM_SUCCESS,
  pantryItem,
});

const SAVE_PANTRY_ITEM_FAILURE = `${SAVE_PANTRY_ITEM}_FAILURE`;
const savePantryItemFailure = error => ({
  type: SAVE_PANTRY_ITEM_FAILURE,
  error,
});

const REQUEST_PENDING = 'pantryItems/REQUEST_PENDING';
const requestPending = (key, loadingBody = '') => ({
  type: REQUEST_PENDING,
  key,
  loadingBody,
});

const RESET_STATUS = 'pantryItems/RESET_STATUS';
const resetStatus = key => ({
  type: RESET_STATUS,
  key,
});

// Reducer.
// -----------------------------------------------------------------------------
const savePantryItemSuccessHelper = (pantryItems, action) => ({
  ...pantryItems,
  [action.pantryItem.id]: action.pantryItem,
});

const defaultState = {
  pantryItems: null,
  fetchStatus: { loading: '' },
  patchStatus: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PANTRY_ITEMS_SUCCESS:
      return {
        ...state,
        pantryItems: action.pantryItems,
        fetchStatus: { success: '' },
      };
    case FETCH_PANTRY_ITEMS_FAILURE:
      return {
        ...state,
        fetchStatus: { error: action.error },
      };
    case SAVE_PANTRY_ITEM_SUCCESS:
      return {
        ...state,
        pantryItems: savePantryItemSuccessHelper(state.pantryItems, action),
        patchStatus: { success: action.pantryItem.id },
      };
    case SAVE_PANTRY_ITEM_FAILURE:
      return {
        ...state,
        patchStatus: { error: action.error },
      };
    case REQUEST_PENDING:
      return {
        ...state,
        [action.key]: { loading: action.loadingBody },
      };
    case RESET_STATUS:
      return {
        ...state,
        [action.key]: {},
      };
    default:
      return state;
  }
};

// Saga.
// -----------------------------------------------------------------------------
export function* fetchPantryItemsSaga(action) {
  try {
    yield put(requestPending('fetchStatus'));
    const pantryItems = yield call(fetchPantryItemsAPI, action.userId);
    yield put(fetchPantryItemsSuccess(pantryItems));
  } catch (error) {
    yield put(fetchPantryItemsFailure(error));
  }
}

export function* savePantryItemSaga(action) {
  console.log('action: ', action);
  try {
    yield put(requestPending('patchStatus'));
    const args = [action.id, action.pantryItem];
    yield call(patchPantryItemsAPI, ...args);
    yield put(savePantryItemSuccess(action.pantryItem));
    yield put(resetStatus('patchStatus'));
  } catch (error) {
    yield put(savePantryItemFailure(error));
  }
}
