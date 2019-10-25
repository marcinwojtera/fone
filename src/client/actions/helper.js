import { forEach, map, pick } from 'lodash';

export const calculateChart = (driverHistory, loadedCompareDriver, chartSelectedYears, mainDriver, qualiView) => {
  const graphData = pick(driverHistory, chartSelectedYears);
  const data = [];
  forEach(graphData, (year, key) => {
    if (year) {
      data.push({ id: key, year: key, driverId: mainDriver, info: data, data: map(qualiView ? year.driversQualify : year.drivers, d => ({ x: d.season, y: d.data.position })) });
    }
  });

  forEach(loadedCompareDriver, (years, driverId) => {
    const graphCompareData = pick(years, chartSelectedYears);
    forEach(graphCompareData, (year, key) => {
      if (year) {
        data.push({ id: `${driverId} ${key}`, year: key, driverId, info: data, data: map(qualiView ? year.driversQualify : year.drivers, d => ({ x: d.season, y: d.data.position })) });
      }
    });
  });
  return data;
};

export const getDate = date => date ? new Date(date) : new Date();


export const statistics = (driverHistory) => {
  let won = 0;
  let second = 0;
  let third = 0;
  let pole = 0;
  let ret = 0;
  const status = {};

  map(driverHistory).map(year => map(year.drivers, season => {
    if (season.data.grid == 1) {
      pole += 1;
    }
    if (season.data.position == 1) {
      won += 1;
    }
    if (season.data.position == 2) {
      second += 1;
    }
    if (season.data.position == 3) {
      third += 1;
    }
    if (season.data.position == 3) {
      third += 1;
    }
    if (season.data.positionText == 'R') {
      ret += 1;

      if (status[season.data.status]) {
        status[season.data.status] = status[season.data.status] + 1;
      } else {
        status[season.data.status] = 1;
      }
    }
  }));
  return { won, second, third, pole, ret, status };
};

export const maps = obj => Object.keys(obj).map(x => x);
