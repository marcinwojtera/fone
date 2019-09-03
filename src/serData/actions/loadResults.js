import fetch from 'node-fetch';

export const BACK_FETCH_RESULTS = 'BACK_FETCH_RESULTS';

export const loadRace = year => dispatch => {
  const raceResults = () => fetch(`http://ergast.com/api/f1/${year}/results.json?limit=1000`)
    .then(rest => rest.json())
    .then(json => json.MRData.RaceTable.Races)
    .catch(err => console.log(err));

  Promise.all([raceResults(year)]).then(values => {
    dispatch({
      type: BACK_FETCH_RESULTS,
      payload: { year, values },
    });
  }).then(x=> console.log('Load Results', year))
    .catch(function(err) {
    console.log(err.message);
  });
};
