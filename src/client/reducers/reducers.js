import { FETCH_DATA } from '../actions/index';

export const loadedData = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return [...action.payload];
    default:
      return state;
  }
};
