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
