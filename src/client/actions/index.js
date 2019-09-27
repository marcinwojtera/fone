import axios from 'axios';
import { forEach } from 'lodash';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DRIVER_DATA = 'FETCH_DRIVER_DATA';
export const FETCH_DATA_TRACK = 'FETCH_DATA_TRACK';
export const FETCH_DATA_TRACK_YEAR_AGO = 'FETCH_DATA_TRACK_YEAR_AGO';
export const FETCH_DATA_TRACK_HISTORY = 'FETCH_DATA_TRACK_HISTORY'

  export const fetchData = (params, pathname) => (dispatch, getState) => {

  const getData = axios.get(`/api${pathname}`)
    .then(rest => rest.data);
  // const navigation = {params, pathname}
  Promise.all([getData]).then(values => {
    dispatch({
      type: FETCH_DATA,
      payload: {
        data: values[0].data,
        navigation: values[0].navigation,
        driverHistory: values[0].driverHistory,
        selectedTrack: values[0].selectedTrack
      },
    });

    // window.history.pushState('page2', 'Title', pathname)
  });
};

export const fetchDataWiki = (navigation) => (dispatch, getState) => {

  const selectedTrack = navigation.season ? getState().data.seasonsList[navigation.season -1] : null;
  const circuit = selectedTrack ? selectedTrack.Circuit.url.split('/').slice(-1).pop() : false
  const getDataTrackFromWiki = axios.get(`https://pl.wikipedia.org/api/rest_v1/page/summary/${circuit}`)
    .then(rest => {
      dispatch({
        type: FETCH_DATA,
        payload: {...getState(), ...{selectedTrack, ...{selectedTrack: rest.data}} }
      });
    });
};

export const fetchTrack = (season) => (dispatch, getState) => {

  const selectedTrack = season ? getState().data.seasonsList[season -1] : null;
  const circuit = selectedTrack ? selectedTrack.Circuit.url.split('/').slice(-1).pop() : false
  axios.get(`https://pl.wikipedia.org/api/rest_v1/page/summary/${circuit}`)
    .then(rest => {
      dispatch({
        type: FETCH_DATA_TRACK,
        payload: {loadedTrackHome: rest.data},
      });
    });
};

export const fetchTrackYearAgo = (year, season, track) => (dispatch) => {
  axios.get(`/api/historyTrack/${year}/${season}/${track}`)
    .then(rest => {
      dispatch({
        type: FETCH_DATA_TRACK_YEAR_AGO,
        payload: {historyTrack: rest.data},
      });
    });
};

export const fetchDriverToCompare = (driverId) => (dispatch, getState) => {
  const driver = getState().loadedCompareDriver[driverId]
  if (!driver) {
    axios.get(`/api/compare/${driverId}`)
      .then(compare =>   dispatch({
        type: FETCH_DRIVER_DATA,
        payload: {...getState().loadedCompareDriver, ...{[driverId]: compare.data}}
      }));
  } else {
    const list = getState().loadedCompareDriver;
    const newList = {}
    forEach(list, (data, driver) => {
      if (driver !== driverId) newList[driver] = data;
    })
    dispatch({
      type: FETCH_DRIVER_DATA,
      payload: newList
    })
  }
};


export const fetchHistoryTrackResults = (circuit) => (dispatch, getState) => {
  axios.get(`/api/trackStats/${circuit}`)
    .then(rest => {
      dispatch({
        type: FETCH_DATA_TRACK_HISTORY,
        payload: rest.data
      });
    });
};


export const changeUrl = (params, pathname) =>  dispatch => dispatch(fetchData(params, pathname))
