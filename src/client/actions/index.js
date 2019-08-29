import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';
export const CHANGE_URL = 'CHANGE_URL';

export const fetchData = (navigation) => (dispatch, getState) => {

  const selectedTrack = navigation.season ? getState().data.seasonsList[navigation.season -1] : null;
  const circuit = selectedTrack ? selectedTrack.Circuit.url.split('/').slice(-1).pop() : false

  const getDataTrackFromWiki = axios.get(`https://pl.wikipedia.org/api/rest_v1/page/summary/${circuit}`)
    .then(rest => rest.data);

  const getData = axios.get(`/api/race/${navigation.year}/${navigation.season}`)
    .then(rest => rest.data);

  Promise.all([getData, getDataTrackFromWiki]).then(values => {
    dispatch({
      type: FETCH_DATA,
      payload: {data: values[0].data, selectedTrack: {...selectedTrack, ...values[1]}, navigation: navigation},
    });
  });
};

export const changeUrl = (navigation) =>  dispatch => dispatch(fetchData(navigation))
