import { combineReducers } from 'redux';
import { backSeasons, backDriverList, backRaceResults, backQualifyList, backYears } from './reducers';

export default combineReducers({
  seasons: backSeasons,
  seasonsYear: backYears,
  results: backRaceResults,
  drivers: backDriverList,
  qualify: backQualifyList,
});
