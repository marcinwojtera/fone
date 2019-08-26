export const BACK_FETCH_STATS = 'BACK_FETCH_STATS';

export const loadStats = year => dispatch => {
  const values = [];
  for (let i = 0; i < 21; i++) { 
    ((index) => {
      const prepareFile = `${year || '2019'}-${index + 1 || '1'}.json`;
      try {
        // eslint-disable-next-line import/no-dynamic-require
        // a path we KNOW is totally bogus and not a module
        const jsonData = require(`../jsons/${prepareFile}`);
        const data = { round: (index + 1).toString(), value: jsonData.MRData.RaceTable.Races[0].Laps };
        values.push(data);
      } catch (e) {
        const data = false;
        values.push(data);
      }
    })(i);
  }

  dispatch({
    type: BACK_FETCH_STATS,
    payload: { year, values },
  });
};
