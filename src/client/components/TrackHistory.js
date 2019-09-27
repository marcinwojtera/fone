import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { fetchHistoryTrackResults } from "../actions";
import { Segment, Label } from 'semantic-ui-react';

class TrackHistory extends Component {
  state = {
    loading: true,
  }
  componentDidMount() {
    this.loadHistoryResults();
  }
  componentDidUpdate (prevProps) {
   if(prevProps.pathname !== this.props.pathname && this.props.selectedTrack !== prevProps.selectedTrack) {
     this.loadHistoryResults();
   }
  }
  loadHistoryResults = () => {
    this.props.dispatch(fetchHistoryTrackResults(this.props.selectedTrack))
  }
  renderDriver = (driver, year) => {
    return (<Link to={`/driver/${driver.driverId}/${year}`}>
      <small>{driver.givenName} {driver.familyName}</small>
    </Link>)
  }
  render() {
    return (
      <div>

        <Segment loading={this.props.loading} style={{minHeight: 150}}>
          <div style={{columnCount: 4}}>
            <div><strong><small>WINNER</small></strong></div>
            <div><strong><small>POLE POSITION</small></strong></div>
            <div><strong><small>BEST TIME</small></strong></div>
            <div><strong><small>AVG SPEED</small></strong></div>
          </div>
          {map(this.props.trackHistoryStats, (data, year)  => {
            const showRow = data.winner[0] && data.pole[0] && data.fastestLap[0] && data.avgSpeed[0];
            return showRow && (<div style={{columnCount: 4}} key={year}>
              <div><Label size={'mini'}>{year}</Label> -  <span>{this.renderDriver(data.winner[0], year)}</span></div>
              <div><Label size={'mini'}>{year}</Label> - <span>{this.renderDriver(data.pole[0], year)} </span></div>
              <div><Label size={'mini'}>{year}</Label> - <span><small><strong>{data.avgSpeed[0].time}</strong></small>  {this.renderDriver(data.fastestLap[0].driver, year)}  </span></div>
              <div><Label size={'mini'}>{year}</Label> - <span><small><strong>{data.avgSpeed[0].speed}</strong></small> {this.renderDriver(data.avgSpeed[0].driver, year)} </span></div>
            </div>)
          })}
        </Segment>
        <br/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack.raceName,
  pathname: state.navigation.pathname,
  trackHistoryStats: state.trackHistoryStats,
  loading: !state.trackHistoryStats
});
export default connect(mapStateToProps)(TrackHistory);
