import fetch from 'node-fetch';
const _ = require('lodash/core');
export const BACK_FETCH_DRIVER = 'BACK_FETCH_DRIVER';
const wait = require('wait-for-stuff');

export const loadDriverPerRace = year => (dispatch) => {
  const table = new Array();
  const fetchDrivers = (season) => fetch(`https://ergast.com/api/f1/${year}/${season}/driverStandings.json`)
    .then(data => data.json())
    .then(data => {
      const values = {season, data: data.MRData.StandingsTable.StandingsLists[0].DriverStandings || []}
      table.push(values)

    }).then(c =>{
      console.log('load loadDriverPerRace',year, season)
      dispatch({
        type: BACK_FETCH_DRIVER,
        payload: { year, values: _.sortBy(table, 'season') },
      })
    })
    .catch(err => {
      console.log(err)
    })
    .catch(err => console.log(err));

  for (let i =  1; i < 1; i++) {
    wait.for.time(0.2);
    fetchDrivers(i);
  }

};
