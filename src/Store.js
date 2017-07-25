import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import sagas from './rootSaga';
import reducers from './rootReducer';

// Create a middleware array in order to push all middleware independently.
let middleware = [];

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

// Apply middleware to middleware constant.
middleware = applyMiddleware(...middleware);

// Add the redux dev tools
if (process.env.NODE_ENV === 'development') {
  middleware = composeWithDevTools(middleware);
}

// Create store with devtools and middleware.
const store = createStore(reducers, middleware);
sagaMiddleware.run(sagas);

export default store;
