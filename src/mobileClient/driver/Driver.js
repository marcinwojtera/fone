import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { WhiteSpace, Tabs } from 'antd-mobile';
import { map, filter } from 'lodash';
import HeaderDriverHistory from './HeaderDriverHistory';
import DriverChart from '../../client/components/driverHistory/DriverChart';
import { calculateChart } from '../../client/actions/helper';


const Driver = () => {
  const driverHistory = useSelector(state => state.driverHistory);
  const loadedCompareDriver = useSelector(state => state.loadedCompareDriver);

  const year = useSelector(state => state.navigation.year);
  const driverId = useSelector(state => state.navigation.driverId);

  const calculateDataChart = (selectedYears) => calculateChart(driverHistory, loadedCompareDriver, selectedYears, driverId, false)

  const [chartSelectedYears, onChangeYear] = useState([year]);
  const [chartData, onChartChange] = useState(calculateDataChart([year]));
  const selectChartYear = (year) => {
    onChartChange(calculateDataChart([year]))
    onChangeYear(year)
  }
  const tabs = filter(map(driverHistory, (data, year) => data && ({ title: year, key: year }) ), 'title');

  useEffect(() => {
    onChartChange(calculateDataChart([year]))
  }, [driverId]);

  return driverId ? (
    <>
      <HeaderDriverHistory />

      <div>
        <WhiteSpace />
        <Tabs tabs={tabs}
              initialPage={year}
              onTabClick={(tab) => { selectChartYear(tab.title) }}
        />
        <WhiteSpace />
      </div>
      <div style={{overflowX: 'scroll', overflowY: 'hidden', width: '100%', background: '#fff' }}>
      <div style={{width: '200%'}}>
        <DriverChart
          key={chartSelectedYears}
          height={290}
          mobile
          data={chartData}
        />
      </div>
      </div>
    </>
  ) : null;
};

export default Driver;
