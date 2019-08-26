import axios from 'axios';
import { createUrl } from '../../helper';

export const FETCH_DATA = 'FETCH_DATA';

export const fetchData = (year, season) => async dispatch => {
  
  const getData = axios.get(`/api/${year}${season ? `/${season}` : ''}`)
    .then(rest => rest.data);

  Promise.all([getData]).then(values => {
    dispatch({
      type: FETCH_DATA,
      payload: values[0].data,
    });
  });
};
