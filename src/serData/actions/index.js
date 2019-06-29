import { loadRace } from './loadResults';
import { loadDriver } from './loadDriver';

export const BACK_FETCH_SEASONS = 'BACK_FETCH_SEASONS';

export const fetchData = (year, data) => dispatch => {
  dispatch(loadRace(year));
  dispatch(loadDriver(year));

  dispatch({
    type: BACK_FETCH_SEASONS,
    payload: { [year]: data[0].Races }
  });
  console.log('----loaded', year);
};
