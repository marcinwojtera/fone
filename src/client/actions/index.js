import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DRIVER_DATA = 'FETCH_DRIVER_DATA';
export const FETCH_DATA_TRACK = 'FETCH_DATA_TRACK';
export const OPEN_PAGE_LOADER = 'OPEN_PAGE_LOADER';

export const showPageLoader = (open) => (dispatch) => {
  dispatch({
    type: OPEN_PAGE_LOADER,
    payload: open,
  });
};

export const fetchData = (pathname) => (dispatch) => {

  dispatch(showPageLoader(true));

  const config = {
    method: 'get',
    url: pathname,
    headers: { Accept: 'application/json' },
  };

  const getData = axios(config)
    .then(rest => rest.data);
  Promise.all([getData]).then(values => {
    dispatch({
      type: FETCH_DATA,
      payload: {
        data: values[0].data,
        navigation: values[0].navigation,
        driverHistory: values[0].driverHistory,
        selectedTrack: values[0].selectedTrack,
        trackHistoryStats: values[0].trackHistoryStats,
        historyTrack: values[0].historyTrack,
        pageLoader: false,
      },
    });
  });
};

export const fetchDataWiki = (navigation) => (dispatch, getState) => {
  const selectedTrack = navigation.season ? getState().data.seasonsList[navigation.season - 1] : null;
  const circuit = selectedTrack ? selectedTrack.Circuit.url.split('/').slice(-1).pop() : false;
  axios.get(`https://pl.wikipedia.org/api/rest_v1/page/summary/${circuit}`)
    .then(rest => {
      dispatch({
        type: FETCH_DATA,
        payload: { ...getState(), ...{ selectedTrack, ...{ selectedTrack: rest.data } } },
      });
    });
};


export const fetchTrackMedia = (season) => (dispatch, getState) => {
  const selectedTrack = season ? getState().data.seasonsList[season - 1] : null;
  const circuit = selectedTrack ? selectedTrack.Circuit.url.split('/').slice(-1).pop() : false;
  axios.get(`https://pl.wikipedia.org/api/rest_v1/page/media/${circuit}`)
    .then(rest => {
      dispatch({
        type: FETCH_DATA_TRACK,
        payload: { loadedTrackHome: rest.data.items[0] },
      });
    });
};

export const fetchTrack = (season) => (dispatch, getState) => {
  const selectedTrack = season ? getState().data.seasonsList[season - 1] : null;
  const circuit = selectedTrack ? selectedTrack.Circuit.url.split('/').slice(-1).pop() : false;
  axios.get(`https://pl.wikipedia.org/api/rest_v1/page/summary/${circuit}`)
    .then(rest => {
      dispatch({
        type: FETCH_DATA_TRACK,
        payload: { loadedTrackHome: rest.data },
      });
    });
};

export const fetchDriverToCompare = (driverId) => (dispatch, getState) => {
  const driver = getState().loadedCompareDriver[driverId];
  if (!driver) {
    axios.get(`/api/compare/${driverId}`)
      .then(compare => dispatch({
        type: FETCH_DRIVER_DATA,
        payload: { ...getState().loadedCompareDriver, ...{ [driverId]: compare.data } },
      }));
  } else {
    const newList = {};

    for (let driver in getState().loadedCompareDriver) {
      if (driver !== driverId) newList[driver] = getState().loadedCompareDriver[driver];
    }

    dispatch({
      type: FETCH_DRIVER_DATA,
      payload: newList,
    });
  }
};
