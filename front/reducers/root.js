import { combineReducers } from 'redux';

// Import reducers
import photos from './photos';
import modal from './modal';

const rootReducer = combineReducers({ photos, modal });

export default rootReducer;