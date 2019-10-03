import { combineReducers } from 'redux';
import { trackHistoryStats,
  historyTrack, loadedTrackHome,
  driverHistory,
  loadedData,
  navigation,
  selectedTrack,
  loadedCompareDriver,
} from './reducers';

export default combineReducers({
  data: loadedData,
  navigation,
  selectedTrack,
  driverHistory,
  loadedCompareDriver,
  loadedTrackHome,
  historyTrack,
  trackHistoryStats,
});
