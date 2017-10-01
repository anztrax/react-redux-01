import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import  { loadCourses } from './actions/courseActions';
import {loadAuthors} from "./actions/authorActions";

import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
//this is called in here for stimulate API call from server !
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
