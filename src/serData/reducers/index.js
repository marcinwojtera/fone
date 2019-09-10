import { combineReducers } from 'redux';
import { backStatusesPerRace, backConstructorsPerRace, backConstructors, backPitStop, backSeasons, backDriverList, backRaceResults, backQualifyList, backYears, backStatsBySeason, loadInfo } from './reducers';

// export default combineReducers(JSON.parse(json));
export default combineReducers({
  seasons: backSeasons,
  constructors: backConstructors,
  constructorsPerRace: backConstructorsPerRace,
  statusesPerRace: backStatusesPerRace,
  seasonsYear: backYears,
  seasonsResults: backRaceResults,
  seasonsDrivers: backDriverList,
  qualify: backQualifyList,
  pitStop: backPitStop,
  stats: backStatsBySeason,
  loadInfo,
});
