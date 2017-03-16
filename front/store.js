import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

export default store;