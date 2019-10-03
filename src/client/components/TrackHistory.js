import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { Segment, Label } from 'semantic-ui-react';

const renderDriver = (driver, year) => (
  <Link to={`/driver/${driver.driverId}/${year}`}>
    <span className={'track-history-link'}>{driver.givenName[0]}. {driver.familyName}</span>
  </Link>
);

const TrackHistory = ({ loading, trackHistoryStats, track }) => (
  <div>
    <Segment basic={!!track} loading={loading} style={{minHeight: 90}} className="track-history">
      {trackHistoryStats && <div>
        <div style={{columnCount: 4}}>
          <div><strong><small>WINNER</small></strong></div>
          <div><strong><small>POLE POSITION</small></strong></div>
          <div><strong><small>BEST TIME</small></strong></div>
          <div><strong><small>AVG SPEED</small></strong></div>
        </div>
        {map(trackHistoryStats, (data, year) => {
          const showRow = data.winner[0] && data.pole[0] && data.fastestLap[0] && data.avgSpeed[0];
          return showRow && (<div style={{columnCount: 4, columnRule: '1px solid #d8d8d8'}} key={year}>
            <div><Label size={'mini'}>{year}</Label> -  <span>{renderDriver(data.winner[0], year)}</span></div>
            <div><Label size={'mini'}>{year}</Label> - <span>{renderDriver(data.pole[0], year)} </span></div>
            <div><Label size={'mini'}>{year}</Label> - <span> {renderDriver(data.fastestLap[0].driver, year)} - <small><strong className='bold'>{data.avgSpeed[0].time}</strong></small></span></div>
            <div><Label size={'mini'}>{year}</Label> - <span>{renderDriver(data.avgSpeed[0].driver, year)} - <small><strong className='bold'>{data.avgSpeed[0].speed.split('.')[0]}</strong> (km/h)</small></span></div>
          </div>)
        })}
      </div>
      }
    </Segment>
    <br />
  </div>
);


const mapStateToProps = (state) => ({
  trackHistoryStats: state.trackHistoryStats,
  loading: !state.trackHistoryStats
});
export default connect(mapStateToProps)(TrackHistory);
