import { BACK_FETCH_SEASONS, BACK_YEARS_SEASONS } from '../actions/loadSeasons';
import { BACK_FETCH_DRIVER_STANDINGS } from '../actions/loadDriverStandings';
import { BACK_FETCH_RESULTS } from '../actions/loadResults';
import { BACK_FETCH_QUALIFY } from '../actions/loadQualify';
import { BACK_FETCH_STATS } from '../actions/loadStats';
import { BACK_FETCH_PITS } from '../actions/loadPitStops';
import { BACK_FETCH_CONSTRUCTORS_PER_RACE } from '../actions/loadConstructorsPerRace';
import { BACK_FETCH_CONSTRUCTORS } from '../actions/loadConstructors';
import { BACK_FETCH_RACE_STATUSES_PER_RACE } from '../actions/loadRaceStatuses';

export const backStatusesPerRace = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_RACE_STATUSES_PER_RACE:
      return { ...state, ...{ [action.payload.year]: action.payload.values } };
    default:
      return state;
  }
};

export const backDriverList = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_DRIVER_STANDINGS:
      const driversList = {};
      action.payload.values[0].map(x => driversList[[x.Driver.driverId]]= x)
      return { ...state, ...{ [action.payload.year]: driversList } };
    default:
      return state;
  }
};


export const backPitStop = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_PITS:
      return { ...state, ...{ [action.payload.year]: action.payload.values } };
    default:
      return state;
  }
};


export const backRaceResults = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_RESULTS:
      action.payload.values[0].Circuit = [];
      return { ...state, ...{ [action.payload.year]: action.payload.values[0] } };
    default:
      return state;
  }
};

export const backQualifyList = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_QUALIFY:
      return { ...state, ...{ [action.payload.year]: action.payload.values[0] } };
    default:
      return state;
  }
};

export const backStatsBySeason = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_STATS:
      return { ...state, ...{ [action.payload.year]: action.payload.values } };
    default:
      return state;
  }
};

export const backYears = (state = [], action) => {
  switch (action.type) {
    case BACK_YEARS_SEASONS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};


export const backSeasons = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_SEASONS:
      return { ...state, ...{ [action.payload.year]: action.payload.values[0] } };
    default:
      return state;
  }
};

export const backConstructors = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_CONSTRUCTORS:
      return { ...state, ...{ [action.payload.year]: action.payload.values[0] } };
    default:
      return state;
  }
};

export const backConstructorsPerRace = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_CONSTRUCTORS_PER_RACE:
      return { ...state, ...{ [action.payload.year]: action.payload.values } };
    default:
      return state;
  }
};
