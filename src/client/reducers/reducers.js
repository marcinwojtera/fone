import { FETCH_DATA, CHANGE_URL } from '../actions/index';

export const loadedData = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.data;
    default:
      return state;
  }
};

const navigationInitialState = {
  page: '/',
  year: 2019,
  season: 1
}
export const navigation = (state = navigationInitialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.navigation;
    default:
      return state;
  }
};

export const selectedTrack = (state = null, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.selectedTrack;
    default:
      return state;
  }
};



