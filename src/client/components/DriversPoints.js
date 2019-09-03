import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Message } from 'semantic-ui-react';
import QualifyBlock from "./block/QualifyBlock";
import ResultsBlock from "./block/ResultsBlock";
import TrackBlock from "./block/TrackBlock";
import MapBlock from "./block/MapBlock";
import DriverPointBlock from "./block/DriverPointBlock";
import RaceTimming from './block/RaceTimming'
import PitStops from './block/PitStops'

import MyResponsiveLine from './block/DriverPositionStatsBlock';
import { Tab, Dimmer, Header, Icon,  Segment } from 'semantic-ui-react'

const panes = [
  { menuItem:{ key: 'Results', icon: 'winner', content: 'Results' }, render: () => <Tab.Pane><ResultsBlock /></Tab.Pane> },
  { menuItem: { key: 'Qualify', icon: 'flag checkered', content: 'Qualify' }, render: () => <Tab.Pane> <QualifyBlock /></Tab.Pane> },
  { menuItem: { key: 'Pit Stops', icon: 'wait', content: 'Pit Stops' }, render: () => <Tab.Pane> <PitStops /></Tab.Pane> },
  { menuItem: { key: 'Driver points', icon: 'area graph', content: 'Driver points' }, render: () => <Tab.Pane> <DriverPointBlock /></Tab.Pane> },
  { menuItem: { key: 'RaceTimming', icon: 'line graph', content: 'Race timming' }, render: () => <Tab.Pane> <RaceTimming /></Tab.Pane> },

  // { menuItem: { key: 'MyResponsiveLine', icon: 'line graph', content: 'Driver points per year' }, render: () => <Tab.Pane> <MyResponsiveLine /></Tab.Pane> },
]
const panesMap = [
  { menuItem: 'Map', render: () => <Tab.Pane> <MapBlock /></Tab.Pane> },
  { menuItem: 'Track info', render: () => <Tab.Pane><TrackBlock /></Tab.Pane> },
]
class DriversPoints extends Component {
  state = {
    active: false,
    text: '',
    text2:''
  }

  render() {
    const isFeatureRace = new Date(this.props.selectedTrack.date) >= new Date()
    return (
      <div>


        <Dimmer.Dimmable as={Segment} dimmed={isFeatureRace}>
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

          <Dimmer active={isFeatureRace} onClickOutside={this.handleHide}>
            <Header as='h2' icon inverted>
              <Icon name='heart' />
              Dimmed Message!
            </Header>
          </Dimmer>
        </Dimmer.Dimmable>




      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack,
});
export default connect(mapStateToProps)(DriversPoints);
