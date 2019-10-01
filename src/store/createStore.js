/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { filter, min, find } from 'lodash';
import reducers from '../client/reducers';
import { backstore } from '../serData/pool';

const _ = require('lodash/core');

export const filterPitStops = (data, season) => {
  if (season) {
    const driverData = _.filter(data, { season: parseInt(season, 10) })[0];
    return driverData ? driverData.data : [];
  }
  return data;
};
export const filterData = (data, season) => (season ? _.filter(data, { round: season })[0] : data);

export const filterDataByTrack = (data, season, track) => (track ? _.filter(data, n => n.Circuit.circuitId == track)[0] : data);

export const filterDataBySeason = (data, season) => {
  if (season) {
    const driverData = _.filter(data, { season: parseInt(season, 10) })[0];
    return driverData ? driverData.data : [];
  }
  return data;
};
export const loadResultsForTrack = (year, season, circuitId) => filterDataByTrack(backstore.getState().seasonsResults[year - 1], season, circuitId);

export const prepareAns = (year, season, pathname, driver) => {
  const getSeason = !season ? '1' : season;
  const getYear = !year ? new Date().getFullYear().toString() : year;
  const data = {
    data: {
      seasonConstructors: backstore.getState().constructors[getYear],
      statusesPerRace: filterDataBySeason(backstore.getState().statusesPerRace[getYear], getSeason),
      constructorsPerRace: filterDataBySeason(backstore.getState().constructorsPerRace[getYear], getSeason),
      seasonsDrivers: backstore.getState().seasonsDrivers[getYear],
      // seasonsDriversList: filterDataBySeason(backstore.getState().driversList[year || getCurrentYear()], season),
      seasonsList: !driver && backstore.getState().seasons[getYear],
      seasonQualify: !driver && filterData(backstore.getState().qualify[getYear], getSeason),
      seasonsResults: !driver && filterData(backstore.getState().seasonsResults[getYear], getSeason),
      seasonsPitStop: !driver && filterPitStops(backstore.getState().pitStop[getYear], getSeason),
      seasonsYears: backstore.getState().seasonsYear,
      statsBySeason: !driver && filterData(backstore.getState().stats[getYear], getSeason),
    },
    navigation: {
      season: getSeason, year: getYear, pathname, driver,
    },
    selectedTrack: !driver && backstore.getState().seasons[getYear][getSeason - 1],
    driverHistory: driver ? loadResultsForDrivers(driver) : [],
    historyTrack: !driver && loadResultsForTrackYearAgo(getYear),
    trackHistoryStats: !driver && loadResultsForTrackStats(backstore.getState().seasons[getYear][getSeason - 1].raceName),
  };

  return data;
};

export const loadResultsForTrackYearAgo = (year) => {
  const dateNow = new Date();
  const getYear = !year ? new Date().getFullYear().toString() : year;
  const circInfo = find(backstore.getState().seasons[getYear], (x => +dateNow <= +new Date(x.date)));
  if (circInfo) {
    return loadResultsForTrack(circInfo.season, circInfo.round, circInfo.Circuit.circuitId);
  } else return false;
};


export const loadResultsForDrivers = (driver) => {
  const results = backstore.getState().seasonsResults;
  const { qualify } = backstore.getState();
  const years = backstore.getState().seasonsYear;
  const driverHistory = {};
  years.map(year => {
    const drivers = [];
    const driversQualify = [];
    results[year].map((data, season) => {
      const seasonByKey = season + 1;
      const foundDriver = data.Results.filter(x => x.Driver.driverId === driver);
      const circuit = filter(backstore.getState().seasons[year], { round: seasonByKey.toString() });
      if (foundDriver.length > 0) {
        drivers.push({ season: seasonByKey, data: foundDriver[0], circuit: circuit[0] });
      }
    });
    qualify[year].map((data, season) => {
      const seasonByKey = season + 1;
      const foundDriver = data.QualifyingResults.filter(x => x.Driver.driverId === driver);
      const circuit = filter(backstore.getState().seasons[year], { round: seasonByKey.toString() });
      if (foundDriver.length > 0) {
        driversQualify.push({ season: seasonByKey, data: foundDriver[0], circuit: circuit[0] });
      }
    });
    driverHistory[year] = drivers.length > 0 ? { drivers, driversQualify } : false;
  });
  return driverHistory;
};

export const loadResultsForTrackStats = (track) => {
  const results = backstore.getState().seasonsResults;
  const { qualify } = backstore.getState();

  const years = backstore.getState().seasonsYear;
  const trackHistory = {};
  years.slice(0, 5).map(year => {
    const winner = [];
    const pole = [];
    const fastestLap = [];
    const avgSpeed = [];
    results[year].map(data => {
      if (data.raceName == track) {
        const findWinner = _.filter(data.Results, { position: '1' })[0];
        const lapTime = data.Results.map(rec => rec.FastestLap && { time: rec.FastestLap.Time.time, driver: rec.Driver, speed: rec.FastestLap.AverageSpeed.speed });
        const findFaster = _.min(lapTime, 'time');
        const findavgSpeed = _.max(lapTime, 'speed');

        avgSpeed.push(findavgSpeed);
        fastestLap.push(findFaster);
        winner.push(findWinner.Driver);
      }
    });
    qualify[year].map(data => {
      if (data.raceName == track) {
        const find = _.filter(data.QualifyingResults, { position: '1' })[0];
        pole.push(find.Driver);
      }
    });
    trackHistory[year] = { winner, pole, fastestLap, avgSpeed };
  });
  return trackHistory;
};

export const initialLoads = (year, season, pathname, driver) => createStore(reducers, prepareAns(year, season, pathname, driver), applyMiddleware(thunk));
