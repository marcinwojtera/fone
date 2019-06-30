import axios from 'axios';
import { createUrl } from '../../helper';

export const FETCH_DATA = 'FETCH_DATA';

export const fetchData = (year, season) => async dispatch => {
  const getData = await axios.get(`/api/test/${year}${season ? `/${season}` : ''}`);
  
  dispatch({
    type: FETCH_DATA,
    payload: getData.data,
  });
};
