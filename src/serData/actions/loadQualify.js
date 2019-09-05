import fetch from 'node-fetch';
export const BACK_FETCH_QUALIFY = 'BACK_FETCH_QUALIFY';

export const loadQualify = year => dispatch => {
  const qualifyTable = () => fetch(`http://ergast.com/api/f1/${year}/qualifying.json?limit=1000`)
    .then(data => data.json())
    .then(data => data.MRData.RaceTable.Races)
    .catch(err => console.log(err));

  Promise.all([qualifyTable(year)]).then(values => {
    dispatch({
      type: BACK_FETCH_QUALIFY,
      payload: { year, values },
    });
  }).catch(function(err) {
    console.log(err.message);
  });
};
