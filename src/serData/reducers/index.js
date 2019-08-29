import { combineReducers } from 'redux';
import { backSeasons, backDriverList, backRaceResults, backQualifyList, backYears, backStatsBySeason, backDrivers, loadInfo } from './reducers';

export default combineReducers({
  seasons: backSeasons,
  seasonsYear: backYears,
  results: backRaceResults,
  drivers: backDriverList,
  driversList: backDrivers,
  qualify: backQualifyList,
  stats: backStatsBySeason,
  loadInfo,
});
