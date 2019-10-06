import { FETCH_DATA, FETCH_DRIVER_DATA, FETCH_DATA_TRACK, OPEN_PAGE_LOADER } from '../actions/index';

export const pageLoader = (state = false, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.pageLoader;
    case OPEN_PAGE_LOADER:
      return true;
    default:
      return state;
  }
};

export const historyTrack = (state = false, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.historyTrack;
    default:
      return state;
  }
};

export const loadedTrackHome = (state = false, action) => {
  switch (action.type) {
    case FETCH_DATA_TRACK:
      return action.payload.loadedTrackHome;
    default:
      return state;
  }
};

export const loadedCompareDriver = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DRIVER_DATA:
      return action.payload;
    default:
      return state;
  }
};

export const loadedData = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state.data, ...action.payload.data }
    default:
      return state;
  }
};

export const driverHistory = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.driverHistory;
    default:
      return state;
  }
};

export const navigation = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.navigation;
    default:
      return state;
  }
};

export const selectedTrack = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.selectedTrack;
    default:
      return state;
  }
};

export const trackHistoryStats = (state = false, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.trackHistoryStats;
    default:
      return state;
  }
};
