import { combineReducers } from 'redux';
import { driversReducer, navigationReducer, settingsReducer } from './reducers';

export default combineReducers({
  data: driversReducer,
  navigation: navigationReducer,
  settings: settingsReducer
});
