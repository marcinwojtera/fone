/* eslint-disable no-underscore-dangle */
// Startup point for client-side application
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import fetch from 'node-fetch';
import backreducers from './reducers';
import { startServer } from '../index'
import { fetchData, saveYear } from './actions';

const composeEnhancers = composeWithDevTools({ port: 3002 });
export const backstore = createStore(backreducers, {}, composeEnhancers(applyMiddleware(thunk)));

const loadRace = async (year) => {
  const raceTable = fetch(`https://ergast.com/api/f1/${year}.json?limit=1000`)
    .then(data => data.json())
    .then(data => data.MRData.RaceTable)
    .catch(err => console.log(err));

  Promise.all([raceTable]).then(values => {
    backstore.dispatch(fetchData(year, values));
  })
};

export const loadData = async ()  => {
  const loadData = fetch('http://ergast.com/api/f1/seasons.json?limit=1000')
    .then(response => response.json())
    .then(data => {
      const test = [2019,2018,2017,2016,2015];// data.MRData.SeasonTable.Seasons; season
      test.map(x => {
        loadRace(x);
         backstore.dispatch(saveYear(x));

      });
    })
    .catch(function(err) {
    console.log(err.message);
  });
  //
  // Promise.all([loadData]).then(values => {
  //   console.log(values)
  //  // startServer()
  // });
};
