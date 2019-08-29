import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import QualifyBlock from "./QualifyBlock";
import ResultsBlock from "./ResultsBlock";
import TrackBlock from "./TrackBlock";
import { Tab } from 'semantic-ui-react'
const panes = [
  { menuItem:{ key: 'Results', icon: 'users', content: 'Results' }, render: () => <Tab.Pane><ResultsBlock /></Tab.Pane> },
  { menuItem: { key: 'Qualify', icon: 'users', content: 'Qualify' }, render: () => <Tab.Pane> <QualifyBlock /></Tab.Pane> },
]
const panesMap = [
  { menuItem: 'Track info', render: () => <Tab.Pane><TrackBlock /></Tab.Pane> },
  { menuItem: 'Map', render: () => <Tab.Pane> <TrackBlock /></Tab.Pane> },
]
class DriversPoints extends Component {
  state = {
    rendered: false,
  }

  render() {
    return (
      <div>
          <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column width={11}>
                <Tab panes={panes} />
              </Grid.Column>
              <Grid.Column width={5}>
                <Tab panes={panesMap} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack
});
export default connect(mapStateToProps)(DriversPoints);
