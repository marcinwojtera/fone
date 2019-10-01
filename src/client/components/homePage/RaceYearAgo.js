import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchTrackYearAgo } from '../../actions'
import HistoryResults from './HistoryResults'

class RaceYearAgo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  render() {
    return this.props.historyTrack ? <HistoryResults /> : null
  }
}

const mapStateToProps = state => ({
  historyTrack: state.historyTrack.Results,
});

export default withRouter(connect(mapStateToProps)(RaceYearAgo));
