import { BACK_FETCH_SEASONS } from '../actions/index';
import { BACK_FETCH_DRIVER } from '../actions/loadDriver';
import { BACK_FETCH_RESULTS } from '../actions/loadResults';

export const backSeasons = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_SEASONS:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export const backDriverList = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_DRIVER:
      return {...state, ...{[action.payload.year]: action.payload.values[0]}  }
    default:
      return state;
  }
};

export const backRaceResults = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_RESULTS:
      return {...state, ...{[action.payload.year]: action.payload.values[0]}  }
    default:
      return state;
  }
};