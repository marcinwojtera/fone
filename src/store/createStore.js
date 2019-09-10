/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import { backstore } from '../serData/pool';
import { map, filter, merge } from 'lodash'
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

export const loadHistoricalResults = (year)=> {
//loadResultsForDrivers()
//   return backstore.getState().drivers[year].map(x => loadResultsForDrivers(x.Driver.driverId)  )
  // return driversList.map((driver, id) => loadResultsForDrivers(id))
}
export const prepareAns = (year = getCurrentYear(), season = 1) => {
  const driversList = {}
  // backstore.getState().drivers[year || getCurrentYear()].map(x => driversList[[x.Driver.driverId]]= x)
  const data = {
    data: {
      seasonConstructors: backstore.getState().constructors[year || getCurrentYear()],
      statusesPerRace: filterDataBySeason(backstore.getState().statusesPerRace[year || getCurrentYear()], season),
      constructorsPerRace: filterDataBySeason(backstore.getState().constructorsPerRace[year || getCurrentYear()], season),
      seasonsDrivers: backstore.getState().seasonsDrivers[year || getCurrentYear()],
      //seasonsDriversList: filterDataBySeason(backstore.getState().driversList[year || getCurrentYear()], season),
      seasonsList: backstore.getState().seasons[year || getCurrentYear()],
      seasonQualify: filterData(backstore.getState().qualify[year || getCurrentYear()], season),
      seasonsResults: filterData(backstore.getState().seasonsResults[year || getCurrentYear()], season),
      seasonsPitStop: filterPitStops(backstore.getState().pitStop[year || getCurrentYear()], season),
      seasonsYears: backstore.getState().seasonsYear,
      statsBySeason: filterData(backstore.getState().stats[year || getCurrentYear()], season),
      loadInfo: backstore.getState().loadInfo,
      historicalResults: loadHistoricalResults(year || getCurrentYear())
    },
    navigation: {
     season, year
    },
    selectedTrack: backstore.getState().seasons[year || getCurrentYear()][season -1]
  };

  return data;
};


export const loadResultsForDrivers = (driver) => {
  const results = backstore.getState().results;

  const years = backstore.getState().seasonsYear;
  const driverInYears = {}
  years.map(year => {
    const drivers = [];
    results[year].map((data, season) => {
      const foundDriver = data.Results.filter(x=>  x.Driver.driverId === driver)
        if (foundDriver.length >0) {
          drivers.push({season: season+1, data: foundDriver})
        }
      }
    )
    driverInYears[year] = drivers.length>0 ? drivers : false
  })

  return driverInYears

};

export const initialLoads = (year, season) => createStore(reducers, prepareAns(year, season), applyMiddleware(thunk));
