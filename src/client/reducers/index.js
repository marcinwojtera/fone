import { combineReducers } from 'redux';
import { driverHistory, loadedData, navigation, selectedTrack, loadedCompareDriver } from './reducers';

export default combineReducers({
  data: loadedData,
  navigation,
  selectedTrack,
  driverHistory,
  loadedCompareDriver
});
