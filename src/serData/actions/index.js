import { loadRace } from './loadResults';
import { loadDriver } from './loadDriver';
import { loadQualify } from './loadQualify';

export const BACK_FETCH_SEASONS = 'BACK_FETCH_SEASONS';
export const BACK_YEARS_SEASONS = 'BACK_YEARS_SEASONS';

export const saveYear = (year) => dispatch => {
  dispatch({
    type: BACK_YEARS_SEASONS,
    payload: [year],
  });
};

export const fetchData = (year, data) => dispatch => {
  dispatch(loadRace(year));
  dispatch(loadDriver(year));
  dispatch(loadQualify(year));

  dispatch({
    type: BACK_FETCH_SEASONS,
    payload: { [year]: data[0].Races },
  });
  console.log('----loaded', year);
};
