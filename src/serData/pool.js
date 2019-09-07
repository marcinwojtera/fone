/* eslint-disable no-underscore-dangle */
// Startup point for client-side application
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import backreducers from './reducers';
import { fetchData } from './actions';

const composeEnhancers = composeWithDevTools({ port: 3002 });
export const backstore = createStore(backreducers, {}, composeEnhancers(applyMiddleware(thunk)));

export const loadData = ()  => {
  const years = [2019, 2018, 2017];
  backstore.dispatch(fetchData(years));
};
