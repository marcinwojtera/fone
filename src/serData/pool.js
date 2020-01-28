/* eslint-disable no-underscore-dangle */
// Startup point for client-side application
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import backreducers from './reducers';
import { fetchData } from './actions';
import { startServer } from '../index';

const fs = require('fs');
const path = require('path');

const develop = !process.env.PORT;

let data = {};

if (develop) {
  const dataJson = fs.readFileSync(path.resolve('./build/jsons/response.json'));
  data = JSON.parse(dataJson);
  const jsonDataLoad = require('./response.json');
}

const composeEnhancers = composeWithDevTools({ port: 3002 });
export const backstore = createStore(backreducers, data, composeEnhancers(applyMiddleware(thunk)));

export const loadData = () => {


  // const years = [2019,2018,2017,2016,2015,2014,2013,2012,2011];
  // backstore.dispatch(fetchData(years));

  if (!develop) {
    const years = [2020, 2019, 2018, 2017, 2016, 2015, 2014];
    backstore.dispatch(fetchData(years));
  } else {
    startServer();
  }
};
