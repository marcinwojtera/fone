import fetch from 'node-fetch';
import {backstore} from "../pool";

export const BACK_FETCH_DRIVER = 'BACK_FETCH_DRIVER';

export const loadDriverPerRace = year => (dispatch, getState) => {
  const table = new Array();
  const drivers = (season) => fetch(`https://ergast.com/api/f1/${year}/${season}/driverStandings.json`)
    .then(data => data.json())
    .then(data => ({season, data: data.MRData.StandingsTable.StandingsLists[0].DriverStandings}))
    .catch(err => console.log(err));

  for (let i = 1; i < 10; i++) {
    table.push(drivers(i))
  }

  Promise.all(table).then(values => {
    dispatch({
      type: BACK_FETCH_DRIVER,
      payload: { year, values },
    });
  });


};
