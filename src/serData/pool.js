/* eslint-disable no-underscore-dangle */
// Startup point for client-side application

import '@babel/core';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import fetch from 'node-fetch';
import reducers from './reducers';
import { fetchSeasons, fetchData , BACK_FETCH_DRIVERS } from './actions';

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const backstore = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(thunk),

));

const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};

export const loadRace = year => {
  const json = response => response.json();

  fetch(`http://ergast.com/api/f1/${year}.json?limit=1000`)
    .then(status)
    .then(json)
    .then(data => {
      backstore.dispatch({
        type: BACK_FETCH_DRIVERS,
        payload: data.MRData.RaceTable
      });

      // backstore.dispatch(fetchData(data.MRData.RaceTable));
    })
    .catch(error => console.log('Request failed', error));
};

export const loadData = () => {
  const json = response => response.json();

  fetch('http://ergast.com/api/f1/seasons.json?limit=1000')
    .then(status)
    .then(json)
    .then(data => {
      const test = ['2019', '2018'];
      test.map(x => loadRace(x));
    })
    .catch(error => {
      console.log('Request failed', error);
    });
    
};


console.log(backstore.getState());