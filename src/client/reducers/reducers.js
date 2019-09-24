import { merge } from 'lodash';

import { FETCH_DATA, FETCH_DRIVER_DATA, FETCH_DATA_TRACK, FETCH_DATA_TRACK_YEAR_AGO } from '../actions/index';


export const historyTrack = (state = false, action) => {
  switch (action.type) {
    case FETCH_DATA_TRACK_YEAR_AGO:
      return action.payload.historyTrack;
    default:
      return state;
  }
};

export const loadedTrackHome = (state = false, action) => {
  switch (action.type) {
    case FETCH_DATA_TRACK:
      return {...state.loadedTrackHome, ...action.payload.loadedTrackHome};
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
      return {...state.data, ...action.payload.data};
    default:
      return state;
  }
};

export const driverHistory = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {...state.driverHistory, ...action.payload.driverHistory};
    default:
      return state;
  }
};

export const navigation = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {...state.navigation, ...action.payload.navigation};
    default:
      return state;
  }
};

export const selectedTrack = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {...state.selectedTrack, ...action.payload.selectedTrack};
    default:
      return state;
  }
};



