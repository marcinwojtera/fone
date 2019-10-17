import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { WhiteSpace, Tabs } from 'antd-mobile';
import { map, filter } from 'lodash';
import HeaderDriverHistory from './HeaderDriverHistory';
import DriverChart from '../../client/components/driverHistory/DriverChart';
import { calculateChart } from '../../client/actions/helper';


const DriverMobile = () => {
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



  return driverId ? (
    <>
      <HeaderDriverHistory />

      <div>
        <WhiteSpace />
        <Tabs tabs={tabs}
              initialPage={year}
              onTabClick={(tab) => { selectChartYear(tab.title) }}
        >

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of first tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of second tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of third tab
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
      <div style={{overflowX: 'scroll', overflowY: 'hidden', width: '100%' }}>
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

export default DriverMobile;
