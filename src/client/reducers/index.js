import { combineReducers } from 'redux';
import { loadedData } from './reducers';

export default combineReducers({
  data: loadedData,
});
