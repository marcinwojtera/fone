import { combineReducers } from 'redux';
import { backDriversReducer } from './reducers';

export default combineReducers({
  data: backDriversReducer
});
