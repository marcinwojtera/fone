import React from 'react';
import { Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { groupBy, map } from 'lodash';
import './DriverColumnView.scss';

const DriverChart = ({ data }) => {
  const seasonsDrivers = useSelector(state => state.data.seasonsDrivers);
  const tableDriver = groupBy(data, 'driverId', 'year');
  return (
    <Segment vertical>
      <div style={{ width: '100%', overflow: 'auto' }} className="driver-compare-table">
        <div style={{ display: 'inline-flex' }}>
          {map(tableDriver, (year, driver) => (
            <div className="compare-column" key={driver}>
              <div className="driver-points">
                {seasonsDrivers[driver].Driver.givenName}
                {seasonsDrivers[driver].Driver.familyName}
              </div>
              <div className="driver-year-group" style={{ display: 'inline-flex' }}>
                {year.map((data) => (
                  <div className="driver-year">
                    {data.year}
                    <div className="season-points">
                      {map(data.data, pkt => (<div className="pkt">{pkt.y}</div>))}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Segment>
  );
}

export default DriverChart;
