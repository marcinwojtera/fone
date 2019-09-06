import fetch from 'node-fetch'
import { BACK_FETCH_CONSTRUCTORS } from './loadConstructorsPerRace'
export const BACK_FETCH_STATS = 'BACK_FETCH_STATS';

export const loadStats = year => dispatch => {

  const port = process.env.PORT || 3002;
  const dev = process.env.NODE_ENV === 'production';

  const server = dev ? `http://localhost:${port}` : `https://localhost:${port}`;

  fetch(`${server}/api/stats/${year}`)
    .then(data => data.json())
  .then(values =>{
      console.log('load stats for:', year)
    dispatch({
      type: BACK_FETCH_STATS,
      payload: { year, values: values.values },
    });
    })
    .catch(err => {
      console.log(err)
    });

};
