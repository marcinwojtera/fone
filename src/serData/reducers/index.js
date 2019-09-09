import { combineReducers } from 'redux';
import { backStatusesPerRace, backConstructorsPerRace, backConstructors, backPitStop, backSeasons, backDriverList, backRaceResults, backQualifyList, backYears, backStatsBySeason, backDrivers, loadInfo } from './reducers';

// export default combineReducers(JSON.parse(json));
export default combineReducers({
  seasons: backSeasons,
  constructors: backConstructors,
  constructorsPerRace: backConstructorsPerRace,
  statusesPerRace: backStatusesPerRace,
  seasonsYear: backYears,
  results: backRaceResults,
  drivers: backDriverList,
  driversList: backDrivers,
  qualify: backQualifyList,
  pitStop: backPitStop,
  stats: backStatsBySeason,
  loadInfo,
});
