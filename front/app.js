import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import axios from 'axios';

//store && reducers
import store from './store.js';
import { getAllPhotos, getSinglePhoto } from './reducers/photos.js'

//components
import Main from './components/Main.js'

const onMainEnter = () => {
  return store.dispatch(getAllPhotos())
}

//renders the main app with fetched data -- connected to static html file
ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Main} onEnter={onMainEnter}></Route>
      </Router>
    </Provider>,
  document.getElementById('app')
);