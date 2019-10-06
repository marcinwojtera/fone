import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HistoryResults from './HistoryResults';

class RaceYearAgo extends React.Component {
  render() {
    return this.props.historyTrack ? <HistoryResults /> : null;
  }
}

const mapStateToProps = state => ({
  historyTrack: state.historyTrack.Results,
});

export default withRouter(connect(mapStateToProps)(RaceYearAgo));
