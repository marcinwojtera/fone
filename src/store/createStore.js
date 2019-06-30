import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import { backstore } from '../serData/pool';
const _ = require('lodash/core');

export const filterData = (data, season) => {

  if (season) {
    return _.filter(data, { round: season });
  }
  return data;
};

export const prepareAns = (year, season) => {
  const data = {
    data: {
      seasonsDrivers: backstore.getState().drivers[year || '2019'],
      seasonsList: backstore.getState().seasons[year || '2019'],
      seasonQualify: filterData(backstore.getState().qualify[year || '2019'], season),
      seasonsResults: filterData(backstore.getState().results[year || '2019'], season),
      seasonsYears: backstore.getState().seasonsYear,
    },
  };
  return data;
}
export const initialLoads = (year, season) => {
  const store = createStore(reducers, prepareAns(year, season), applyMiddleware(thunk));
  return store;
};
