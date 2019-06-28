import { FETCH_DRIVERS, SET_NAVIGATION, FETCH_SEASONS } from '../actions/index';

const settings = {
  loader: true
};

export const driversReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DRIVERS:
      return { ...state, ...action.payload };
    case FETCH_SEASONS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const navigationReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_NAVIGATION:
      return action.payload;
    case FETCH_DRIVERS:
      return action.payload;
    default:
      return state;
  }
};

export const settingsReducer = (state = settings, action) => {
  switch (action.type) {
    case FETCH_DRIVERS:
      return { loader: false };
    default:
      return state;
  }
};
