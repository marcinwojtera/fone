import fetch from 'node-fetch';

export const BACK_FETCH_DRIVER = 'BACK_FETCH_DRIVER';

export const loadDriver = year => dispatch => {
  const driverTable = () => fetch(`https://ergast.com/api/f1/${year}/constructorStandings.json`)
    .then(data => data.json())
    .then(data => data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    .catch(err => console.log(err));

  Promise.all([driverTable(year)]).then(values => {
    dispatch({
      type: BACK_FETCH_DRIVER,
      payload: { year, values },
    });
  }).then(x=> console.log('Load DriverStandings', year))
    .catch(function(err) {
    console.log(err.message);
  });
};
