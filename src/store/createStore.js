/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import { backstore } from '../serData/pool';
import fetch from "node-fetch";

const _ = require('lodash/core');

export const getCurrentYear = () => new Date().getFullYear();

export const filterData = (data, season) => {

  if (season) {
    return _.filter(data, { round: season })[0];
  }
  return data;
};

export const prepareAns = (year = getCurrentYear(), season = 1, page) => {
  const selectedTrack = backstore.getState().seasons[year || getCurrentYear()][season -1];

  const circuit = season ? selectedTrack.Circuit.url.split('/').slice(-1).pop() : false
  const getDataTrackFromWiki = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${circuit}`)
    .then(rest => rest.data);

  Promise.all([getDataTrackFromWiki]).then(values => {
    console.log(values[0])
  });


  const data = {
    data: {
      seasonsDrivers: backstore.getState().drivers[year || getCurrentYear()],
      seasonsDriversList: backstore.getState().driversList[year || getCurrentYear()],
      seasonsList: backstore.getState().seasons[year || getCurrentYear()],
      seasonQualify: filterData(backstore.getState().qualify[year || getCurrentYear()], season),
      seasonsResults: filterData(backstore.getState().results[year || getCurrentYear()], season),
      seasonsYears: backstore.getState().seasonsYear,
      statsBySeason: filterData(backstore.getState().stats[year || getCurrentYear()], season),
      loadInfo: backstore.getState().loadInfo,
    },
    navigation: {
     season, year, page
    },
    selectedTrack: backstore.getState().seasons[year || getCurrentYear()][season -1]
  };

  return data;
};

export const initialLoads = (year, season, page) => createStore(reducers, prepareAns(year, season, page), applyMiddleware(thunk));
