import { BACK_FETCH_SEASONS, BACK_YEARS_SEASONS } from '../actions/index';
import { BACK_FETCH_DRIVER_STANDINGS } from '../actions/loadDriver';
import { BACK_FETCH_RESULTS } from '../actions/loadResults';
import { BACK_FETCH_QUALIFY } from '../actions/loadQualify';
import { BACK_FETCH_STATS } from '../actions/loadStats';
import { BACK_FETCH_DRIVER } from '../actions/loadDriverPerRace';
import { BACK_FETCH_PITS } from '../actions/loadPitStops';

export const backSeasons = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_SEASONS:
      return { ...state, ...action.payload };
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

export const backDriverList = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_DRIVER_STANDINGS:
      return { ...state, ...{ [action.payload.year]: action.payload.values[0] } };
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
export const backDrivers = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_DRIVER:
      return { ...state, ...{ [action.payload.year]: action.payload.values } };
    default:
      return state;
  }
};

export const backRaceResults = (state = {}, action) => {
  switch (action.type) {
    case BACK_FETCH_RESULTS:
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
const loadInfoInitioal = {
  statsBySeason: false,
  seasonQualify: false,
  seasonsResults: false,
  seasonsDrivers: false,
  seasonsDriversList: false,
  seasonsYears: false,
  seasonsList: false
}
export const loadInfo = (state = loadInfoInitioal, action) => {
  switch (action.type) {
    case BACK_FETCH_STATS:
      return { ...state, ...{ statsBySeason: true } };
    case BACK_FETCH_QUALIFY:
      return { ...state, ...{ seasonQualify: true } };
    case BACK_FETCH_RESULTS:
      return { ...state, ...{ seasonsResults: true } };
    case BACK_FETCH_DRIVER:
      return { ...state, ...{ seasonsDrivers: true } };
    case BACK_FETCH_DRIVER_STANDINGS:
      return { ...state, ...{ seasonsDriversList: true } };
    case BACK_YEARS_SEASONS:
      return { ...state, ...{ seasonsYears: true } };
    case BACK_FETCH_SEASONS:
      return { ...state, ...{ seasonsList: true } };
    default:
      return state;
  }
};
