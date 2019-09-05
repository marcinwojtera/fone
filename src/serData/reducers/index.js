import { combineReducers } from 'redux';
import { backConstructors, backPitStop, backSeasons, backDriverList, backRaceResults, backQualifyList, backYears, backStatsBySeason, backDrivers, loadInfo } from './reducers';

export default combineReducers({
  seasons: backSeasons,
  constructors: backConstructors,
  seasonsYear: backYears,
  results: backRaceResults,
  drivers: backDriverList,
  driversList: backDrivers,
  qualify: backQualifyList,
  pitStop: backPitStop,
  stats: backStatsBySeason,
  loadInfo,
});
