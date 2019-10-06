import fetch from 'node-fetch';
const wait = require('wait-for-stuff');
const _ = require('lodash/core');
export const BACK_FETCH_RACE_STATUSES_PER_RACE = 'BACK_FETCH_RACE_STATUSES_PER_RACE';

export const loadRaceStatuses = year => (dispatch) => {
  const statutes = [];
  const fetchStatuses = (season) => fetch(`https://ergast.com/api/f1/${year}/${season}/status.json`)
    .then(data => data.json())
    .then(data => statutes.push({ season, data: data.MRData.StatusTable.Status || [] }))
    .then(c =>{
      console.log('load Statuses for:', year, season)
      dispatch({
        type: BACK_FETCH_RACE_STATUSES_PER_RACE,
        payload: { year, values: statutes},
      })
    })
    .catch(err => {
      console.log(err);
    });

  for (let i =  1; i < 1; i++) {
    wait.for.time(0.1);
    fetchStatuses(i);
  }

};
