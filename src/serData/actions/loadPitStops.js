import fetch from 'node-fetch';
const wait = require('wait-for-stuff');
const _ = require('lodash/core');
export const BACK_FETCH_PITS = 'BACK_FETCH_PITS';

export const loadPits = year => (dispatch) => {
  const pits = new Array();
  const fetchPits = (season) => fetch(`https://ergast.com/api/f1/${year}/${season}/pitstops.json?limit=1000`)
    .then(data => data.json())
    .then(data => {
      const values = {season, data: data.MRData.RaceTable.Races[0] || []}
      pits.push(values)
    }

    ).then(c =>{
      console.log('load Pits',year, season)
      dispatch({
        type: BACK_FETCH_PITS,
        payload: { year, values: _.sortBy(pits, 'season') },
      })
    })
    .catch(err => {
      console.log(err)
    });

  for (let i =  1; i < 21; i++) {
    wait.for.time(0.3);
    fetchPits(i)
  }

};
