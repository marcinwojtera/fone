import { FETCH_DATA } from '../actions/index';

export const loadedData = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, ...action.payload.data };
    default:
      return state;
  }
};
