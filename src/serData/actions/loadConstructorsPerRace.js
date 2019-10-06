import fetch from 'node-fetch';
const wait = require('wait-for-stuff');
const _ = require('lodash/core');
export const BACK_FETCH_CONSTRUCTORS_PER_RACE = 'BACK_FETCH_CONSTRUCTORS_PER_RACE';

export const loadConstructorsPerRace = year => (dispatch) => {
  const constructors = [];
  const fetchConstructors = (season) => fetch(`https://ergast.com/api/f1/${year}/${season}/constructorStandings.json?limit=1000`)
    .then(data => data.json())
    .then(data => {
        const values = {season, data: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings || []}
      constructors.push(values)
      }

    ).then(c =>{
      console.log('load Constructor for:', year, season);
      dispatch({
        type: BACK_FETCH_CONSTRUCTORS_PER_RACE,
        payload: { year, values: _.sortBy(constructors, 'round') },
      })
    })
    .catch(err => {
      console.log(err);
    });

  for (let i =  1; i < 1; i++) {
    wait.for.time(0.1);
    fetchConstructors(i);
  }

};
