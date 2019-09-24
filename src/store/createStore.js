/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import { backstore } from '../serData/pool';
import { filter } from 'lodash'
const _ = require('lodash/core');

export const filterPitStops = (data, season) => {

  if (season) {
    const driverData = _.filter(data, {season: parseInt(season, 10)} )[0]
    return driverData ? driverData.data : [] ;
  }
  return data;
};
export const filterData = (data, season) => {

  if (season) {
    return _.filter(data, { round: season })[0];
  }
  return data;
};

export const filterDataByTrack = (data, season, track) => {

  if (track) {
    return _.filter(data, n => n.Circuit.circuitId == track )[0];
  }
  return data;
};

export const filterDataBySeason = (data, season) => {

  if (season) {
    const driverData = _.filter(data, {season: parseInt(season, 10)} )[0]
      return driverData ? driverData.data : [] ;
  }
  return data;
};
export const loadResultsForTrack = (year, season, circuitId) => {
  return filterDataByTrack(backstore.getState().seasonsResults[year-1], season, circuitId)
}

export const prepareAns = (year, season, pathname, driver) => {
  const getSeason = !season ? 1 : season;
  const getYear = !year ? new Date().getFullYear() : year;
  const data = {
    data: {
      seasonConstructors: backstore.getState().constructors[getYear],
      statusesPerRace: filterDataBySeason(backstore.getState().statusesPerRace[getYear], getSeason),
      constructorsPerRace: filterDataBySeason(backstore.getState().constructorsPerRace[getYear], getSeason),
      seasonsDrivers: backstore.getState().seasonsDrivers[getYear],
      //seasonsDriversList: filterDataBySeason(backstore.getState().driversList[year || getCurrentYear()], season),
      seasonsList: backstore.getState().seasons[getYear],
      seasonQualify: filterData(backstore.getState().qualify[getYear], getSeason),
      seasonsResults: filterData(backstore.getState().seasonsResults[getYear], getSeason),
      seasonsPitStop: filterPitStops(backstore.getState().pitStop[getYear], getSeason),
      seasonsYears: backstore.getState().seasonsYear,
      statsBySeason: filterData(backstore.getState().stats[getYear], getSeason),
      loadInfo: backstore.getState().loadInfo,
    },
    navigation: {
     season: getSeason, year: getYear, pathname, driver
    },
    selectedTrack: backstore.getState().seasons[getYear][getSeason -1],
    driverHistory: driver ? loadResultsForDrivers(driver): []
  };

  return data;
};

export const loadResultsForDrivers = (driver) => {
  const results = backstore.getState().seasonsResults;

  const years = backstore.getState().seasonsYear;
  const driverHistory = {}
  years.map(year => {
    const drivers = [];
    results[year].map((data, season) => {
        const seasonByKey = season + 1

        const foundDriver = data.Results.filter(x=>  x.Driver.driverId === driver);
        const circuit = filter(backstore.getState().seasons[year], { 'round': seasonByKey.toString() } )
        if (foundDriver.length >0) {
          drivers.push({season: seasonByKey, data: foundDriver[0], circuit: circuit[0] });
        }

      }

    )
    driverHistory[year] = drivers.length>0 ? drivers : false
  })

  return driverHistory
};

export const initialLoads = (year, season, pathname, driver) => createStore(reducers, prepareAns(year, season, pathname, driver), applyMiddleware(thunk));

