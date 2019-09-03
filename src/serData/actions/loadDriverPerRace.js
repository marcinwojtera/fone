import fetch from 'node-fetch';

export const BACK_FETCH_DRIVER = 'BACK_FETCH_DRIVER';

export const loadDriverPerRace = year => (dispatch, getState) => {
  const table = new Array();
  const drivers = (season) => fetch(`https://ergast.com/api/f1/${year}/${season}/driverStandings.json`)
    .then(data => data.json())
    .then(data => ({season, data: data.MRData.StandingsTable.StandingsLists[0].DriverStandings}))
    .catch(err => console.log(err));

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  (async ()=> {
    for (let i = 1; i < 20; i++) {
      await sleep(3000)
      table.push(drivers(i))
    }
  })()


  Promise.all(table).then(values => {
    dispatch({
      type: BACK_FETCH_DRIVER,
      payload: { year, values },
    });
  }).then(x=> console.log('Load DriverPerRace', year))
    .catch(function(err) {
    console.log(err.message);
  });

};
