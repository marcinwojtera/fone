import { combineReducers } from 'redux';
import { backSeasons, backDriverList, backRaceResults } from './reducers';

export default combineReducers({
  seasons: backSeasons,
  results: backRaceResults,
  drivers: backDriverList
});
