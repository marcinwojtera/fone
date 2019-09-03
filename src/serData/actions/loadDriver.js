import fetch from 'node-fetch';

export const BACK_FETCH_DRIVER_STANDINGS = 'BACK_FETCH_DRIVER_STANDINGS';

export const loadDriver = year => dispatch => {
  const driverStandings = () => fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`)
    .then(data => data.json())
    .then(data => data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    .catch(err => console.log(err));

  Promise.all([driverStandings(year)]).then(values => {
    dispatch({
      type: BACK_FETCH_DRIVER_STANDINGS,
      payload: { year, values },
    });
  }).then(x=> console.log('Load DriverStandings', year))
    .catch(function(err) {
    console.log(err.message);
  });
};
