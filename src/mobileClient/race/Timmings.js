import React from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { map } from 'lodash';

const Timmings = () => {
  const seasonQualify = useSelector(state => state.data.seasonQualify.QualifyingResults);
  const stats = useSelector(state => state.data.statsBySeason ? state.data.statsBySeason.test : []);
  const driversList = useSelector(state => state.data.seasonsDrivers);

  return (
    <div>
      <div className="race-timming">
        <div className="race-timming-sticky">
          <div className="race-driver"><Icon naame="user circle"/></div>
          {map(seasonQualify, z => (driversList[z.Driver.driverId] ? (<div className="race-driver" key={z.Driver.code}>{z.Driver.code}</div>) : null))}
        </div>
        <PerfectScrollbar>
          <div className="race-timming-slide">

            <div className="timming-row">
              {stats.map((x, i) => (
                <span className="race-time-box" key={i + 1}>
                  <small>
                    Lap {i + 1}
                  </small>
                </span>
              ))}
            </div>

            {map(seasonQualify, (z, d) => (driversList[z.Driver.driverId] ? (
              <div className="timming-row" key={`${z.Driver.driverId}-${d}`}>
                {stats.map((x, i) => {
                  let gap = '';
                  let gapBlock = '';
                  if (i > 0 && x[z.Driver.driverId]) {
                    const lastLap = stats[i - 1][z.Driver.driverId].position;
                    const ccurrentLap = x[z.Driver.driverId].position;
                    gap = lastLap - ccurrentLap;
                    gapBlock = gap !== 0 && (
                      <span className="gap" key={ccurrentLap - x[z.Driver.driverId]}>
                        <span className={gap > 0 ? 'plus' : 'minus'}>
                          {gap > 0 ? (
                            <span>
                              {' '}
                              {gap}
                            </span>
                          ) : (
                            <span>
                              {' '}
                              {gap}
                            </span>
                          )}
                          {gap > 0 ? <Icon name={gap > 1 ? 'angle double up' : 'angle up'}/>
                            : <Icon name={gap < 1 ? 'angle double down' : 'angle down'}/>}
                        </span>
                        {gap > 0 ? <div className="green-box"/> : <div className="red-box"/>}
                      </span>
                    );
                  }

                  return (
                    <span className="race-time-box" key={`${z.Driver.driverId}-${i}`}>
                        {x[z.Driver.driverId] ? (
                          <span>
                            {x[z.Driver.driverId].time}
                            <span className="box-place">
                              {x[z.Driver.driverId].position}
                              {' '}
                              {gapBlock && gapBlock}
                            </span>
                          </span>
                        ) : <span>---</span>}
                      </span>
                  );
                })}
              </div>
            ) : null))}
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default Timmings;
