import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

const configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(reduxThunk,reduxImmutableStateInvariant())
    )
  );
};

export default configureStore;
