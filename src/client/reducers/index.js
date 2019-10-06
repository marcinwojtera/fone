import { combineReducers } from 'redux';
import { trackHistoryStats,
  historyTrack, loadedTrackHome,
  driverHistory,
  loadedData,
  navigation,
  selectedTrack,
  loadedCompareDriver,
  pageLoader,
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
  pageLoader,
});
