import { BACK_FETCH_DRIVERS } from '../actions/index';

const settings = {
  loader: true
};

export const backDriversReducer = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_DRIVERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

