import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Label } from 'semantic-ui-react';
import { maps } from '../actions/helper';

const renderDriver = (driver, year) => (
  <Link to={`/driver/${driver.driverId}/${year}`}>
    <span className="track-history-link">{driver.givenName[0]}. {driver.familyName}</span>
  </Link>
);

const TrackHistory = ({ trackHistoryStats, track, pageLoader }) => (
  <div>
    <Segment basic={!!track} style={{minHeight: 90}} className="track-history" loading={pageLoader}>
      {trackHistoryStats && <div>
        <div style={{columnCount: 4}}>
          <div><strong><small>WINNER</small></strong></div>
          <div><strong><small>POLE POSITION</small></strong></div>
          <div><strong><small>BEST TIME</small></strong></div>
          <div><strong><small>AVG SPEED</small></strong></div>
        </div>

        {maps(trackHistoryStats).map(year => {
          const datas = trackHistoryStats[year];
          const showRow = datas.winner[0] && datas.pole[0] && datas.fastestLap[0] && datas.avgSpeed[0];
          return showRow && (<div style={{columnCount: 4, columnRule: '1px solid #d8d8d8'}} key={year}>
            <div><Label size={'mini'}>{year}</Label> -  <span>{renderDriver(datas.winner[0], year)}</span></div>
            <div><Label size={'mini'}>{year}</Label> - <span>{renderDriver(datas.pole[0], year)} </span></div>
            <div><Label size={'mini'}>{year}</Label> - <span> {renderDriver(datas.fastestLap[0].driver, year)} - <small><strong className='bold'>{datas.avgSpeed[0].time}</strong></small></span></div>
            <div><Label size={'mini'}>{year}</Label> - <span>{renderDriver(datas.avgSpeed[0].driver, year)} - <small><strong className='bold'>{datas.avgSpeed[0].speed.split('.')[0]}</strong> (km/h)</small></span></div>
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
  pageLoader: state.pageLoader,
});
export default connect(mapStateToProps)(TrackHistory);
