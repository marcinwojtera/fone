import { combineReducers } from 'redux';
import { loadedData, navigation, selectedTrack } from './reducers';

export default combineReducers({
  data: loadedData,
  navigation,
  selectedTrack
});
