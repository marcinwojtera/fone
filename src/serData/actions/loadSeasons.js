import fetch from 'node-fetch';

export const BACK_FETCH_SEASONS = 'BACK_FETCH_SEASONS';
export const BACK_YEARS_SEASONS = 'BACK_YEARS_SEASONS';


export const loadSeasons = (year) => dispatch => {
  const raceTable = (year) => fetch(`https://ergast.com/api/f1/${year}.json?limit=1000`)
    .then(data => data.json())
    .then(data => data.MRData.RaceTable.Races)
    .catch(err => console.log(err));

  Promise.all([raceTable(year)]).then(values => {
    dispatch({
      type: BACK_FETCH_SEASONS,
      payload: { year, values },
    });
    console.log('load Races for year ', year);
  })
    .catch((err) => {
      console.log(err.message);
    });
};
