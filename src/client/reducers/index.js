import { combineReducers } from 'redux';
import { driverHistory, loadedData, navigation, selectedTrack } from './reducers';

export default combineReducers({
  data: loadedData,
  navigation,
  selectedTrack,
  driverHistory,
});
