import { combineReducers } from 'redux';
import { loadedTrackHome, driverHistory, loadedData, navigation, selectedTrack, loadedCompareDriver } from './reducers';

export default combineReducers({
  data: loadedData,
  navigation,
  selectedTrack,
  driverHistory,
  loadedCompareDriver,
  loadedTrackHome
});
