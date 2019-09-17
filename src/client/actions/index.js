import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DRIVER_DATA = 'FETCH_DRIVER_DATA';

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

export const changeUrl = (params, pathname) =>  dispatch => dispatch(fetchData(params, pathname))
