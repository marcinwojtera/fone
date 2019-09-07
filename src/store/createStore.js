/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import { backstore } from '../serData/pool';

const _ = require('lodash/core');

export const getCurrentYear = () => new Date().getFullYear();

export const filterPitStops = (data, season) => {

  if (season) {
    const driverData = _.filter(data, {season: parseInt(season, 10)} )[0]
    return driverData ? driverData.data : [] ;
    //;
  }
  return data;
};
export const filterData = (data, season) => {

  if (season) {
    return _.filter(data, { round: season })[0];
  }
  return data;
};

export const filterDataBySeason = (data, season) => {

  if (season) {
    const driverData = _.filter(data, {season: parseInt(season, 10)} )[0]
      return driverData ? driverData.data : [] ;
    //;
  }
  return data;
};

export const prepareAns = (year = getCurrentYear(), season = 1) => {
  const driversList = {}
  backstore.getState().drivers[year || getCurrentYear()].map(x => driversList[[x.Driver.driverId]]= x)
  const data = {
    data: {
      seasonConstructors: backstore.getState().constructors[year || getCurrentYear()],
      constructorsPerRace: filterDataBySeason(backstore.getState().constructorsPerRace[year || getCurrentYear()], season),
      seasonsDrivers: backstore.getState().drivers[year || getCurrentYear()],
      seasonsDriversList: filterDataBySeason(backstore.getState().driversList[year || getCurrentYear()], season),
      seasonsList: backstore.getState().seasons[year || getCurrentYear()],
      seasonQualify: filterData(backstore.getState().qualify[year || getCurrentYear()], season),
      seasonsResults: filterData(backstore.getState().results[year || getCurrentYear()], season),
      seasonsPitStop: filterPitStops(backstore.getState().pitStop[year || getCurrentYear()], season),
      seasonsYears: backstore.getState().seasonsYear,
      statsBySeason: filterData(backstore.getState().stats[year || getCurrentYear()], season),
      loadInfo: backstore.getState().loadInfo,
      driversList
    },
    navigation: {
     season, year
    },
    selectedTrack: backstore.getState().seasons[year || getCurrentYear()][season -1]
  };

  return data;
};

export const initialLoads = (year, season) => createStore(reducers, prepareAns(year, season), applyMiddleware(thunk));
