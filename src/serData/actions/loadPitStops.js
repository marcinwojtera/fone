import fetch from 'node-fetch';

export const BACK_FETCH_PITS = 'BACK_FETCH_PITS';

export const loadPits = year => (dispatch) => {
  const pits = new Array();
  const fetchPits = (season) => fetch(`https://ergast.com/api/f1/${year}/${season}/pitstops.json?limit=100`)
    .then(data => data.json())
    .then(data => ({season, data: data.MRData.RaceTable.Races[0]}))
    .catch(err => console.log(err));

  for (let i =  1; i < 5; i++) {
    pits.push(fetchPits(i));
  }

  Promise.all(pits).then(values => {
    dispatch({
      type: BACK_FETCH_PITS,
      payload: { year, values },
    })
  }).catch(function(err) {
    console.log(err.message);
  });

};
