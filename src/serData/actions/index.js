import { loadRace } from './loadResults';
import { loadDriverStandings } from './loadDriverStandings';
import { loadQualify } from './loadQualify';
import { BACK_YEARS_SEASONS, loadSeasons } from './loadSeasons';
import { loadStats } from './loadStats';
import { loadDriverPerRace } from './loadDriverPerRace';
import { loadPits } from './loadPitStops';
import { loadConstructorsPerRace } from './loadConstructorsPerRace';
import { loadConstructors } from './loadConstructors';
import { loadRaceStatuses } from './loadRaceStatuses';
import { startServer } from '../../index';

const wait = require('wait-for-stuff');

export const fetchByYears = (years) => dispatch => {
  years.map((x) => {
    wait.for.time(1);
    dispatch(loadConstructorsPerRace(x));
    dispatch(loadConstructors(x));
    dispatch(loadDriverStandings(x));
    dispatch(loadSeasons(x));
    dispatch(loadQualify(x));
    dispatch(loadPits(x));
    dispatch(loadRace(x));
    // dispatch(loadDriverPerRace(x));
    dispatch(loadRaceStatuses(x));
  });
};


export const fetchData = (years) => dispatch => {
  dispatch({
    type: BACK_YEARS_SEASONS,
    payload: years,
  });

  dispatch(fetchByYears(years));

  wait.for.time(2);
  startServer().then(() => {
    dispatch(loadStats(2019));
    dispatch(loadStats(2017));
    dispatch(loadStats(2018));
  });
};
