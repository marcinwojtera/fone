import fetch from 'node-fetch';
export const BACK_FETCH_CONSTRUCTORS = 'BACK_FETCH_CONSTRUCTORS';

export const loadConstructors = year => dispatch => {
  const driverStandings = () => fetch(`https://ergast.com/api/f1/${year}/constructorStandings.json?limit=1000`)
    .then(data => data.json())
    .then(data => data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
    .catch(err => console.log(err));

  Promise.all([driverStandings(year)]).then(values => {
    dispatch({
      type: BACK_FETCH_CONSTRUCTORS,
      payload: { year, values },
    });
  }).then(x => console.log('load Constructor for:', year))
    .catch(function(err) {
      console.log(err.message);
    });
};
