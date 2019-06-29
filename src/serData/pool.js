/* eslint-disable no-underscore-dangle */
// Startup point for client-side application
import express from 'express';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import fetch from 'node-fetch';
import backreducers from './reducers';
import { fetchData } from './actions';
const composeEnhancers = composeWithDevTools({ port: 3001 });
export const backstore = createStore(backreducers, {}, composeEnhancers(applyMiddleware(thunk)));

const app = express();
// backstore.subscribe(() => {
//   console.log(backstore.getState().data)
// });

const loadRace = year => {
  const raceTable = fetch(`https://ergast.com/api/f1/${year}.json?limit=1000`)
    .then(data => data.json())
    .then(data => data.MRData.RaceTable)
    .catch(err => console.log(err))
    
    Promise.all([raceTable]).then(values => {
      backstore.dispatch(fetchData(year, values))
    });
};

export const loadData = () => {
  fetch('http://ergast.com/api/f1/seasons.json?limit=1000')
    .then(response => response.json())
    .then(data => {
      const test = [2018,2019,2017]//data.MRData.SeasonTable.Seasons; season
      test.map(x => loadRace(x))
    })
};
