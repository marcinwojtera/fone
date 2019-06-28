import axios from 'axios';
import { createUrl } from '../../helper';

export const FETCH_DRIVERS = 'FETCH_DRIVERS';
export const SET_NAVIGATION = 'SET_NAVIGATION';
export const FETCH_SEASONS = 'FETCH_SEASONS';

export const setUrlData = params => async dispatch => {
  dispatch({
    type: SET_NAVIGATION,
    payload: createUrl(params)
  });
};
export const fetchSeasons = params => async (dispatch, getState) => {
  const getData = await axios.get(`/api/seasons`);
  const data = {
    seasonsList: getData.data.seasonsList
  };
  dispatch({
    type: FETCH_SEASONS,
    payload: data
  });
};
export const fetchData = params => async dispatch => {
  const getData = await axios.get(`/api/call${params || '/current'}`);
  const data = {
    constructorList: getData.data.constructorStandings || [],
    driversList: getData.data.driverStandings || [],
    raceList: getData.data.raceList || [],
    raceResults: getData.data.raceResults || []
  };
  dispatch({
    type: SET_NAVIGATION,
    payload: getData.data.navigation
  });
  dispatch({
    type: FETCH_DRIVERS,
    payload: data
  });
};
