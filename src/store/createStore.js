/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import { backstore } from '../serData/pool';

const _ = require('lodash/core');

export const getCurrentYear = () => new Date().getFullYear();

export const filterData = (data, season) => {

  if (season) {
    return _.filter(data, { round: season })[0];
  }

  return data;
};

export const prepareAns = (year, season) => {
  const data = {
    data: {
      seasonsDrivers: backstore.getState().drivers[year || getCurrentYear()],
      seasonsList: backstore.getState().seasons[year || getCurrentYear()],
      seasonQualify: filterData(backstore.getState().qualify[year || getCurrentYear()], season),
      seasonsResults: filterData(backstore.getState().results[year || getCurrentYear()], season),
      seasonsYears: backstore.getState().seasonsYear,
      statsBySeason: filterData(backstore.getState().stats[year || getCurrentYear()], season),
    },
  };

  return data;
};

export const initialLoads = (year, season) => createStore(reducers, prepareAns(year, season), applyMiddleware(thunk));
