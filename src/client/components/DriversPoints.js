import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import QualifyBlock from "./block/QualifyBlock";
import ResultsBlock from "./block/ResultsBlock";
import TrackBlock from "./block/TrackBlock";
import RaceTimming from './block/RaceTimming';
import PitStops from './block/PitStops'
import HeaderRaceSeason from './block/HeaderRaceSeason';
import StatsElements from './block/StatsElements'
import { Tab, Dimmer, Header, Icon,  Segment } from 'semantic-ui-react'
import { Helmet } from 'react-helmet'

const panes = [
  { menuItem:{ key: 'Results', icon: 'winner', content: 'Results' }, render: () => <Tab.Pane><ResultsBlock /></Tab.Pane> },
  { menuItem: { key: 'Qualify', icon: 'flag checkered', content: 'Qualify' }, render: () => <Tab.Pane> <QualifyBlock /></Tab.Pane> },
  { menuItem: { key: 'Pit Stops', icon: 'wait', content: 'Pit Stops' }, render: () => <Tab.Pane> <PitStops /></Tab.Pane> },
  { menuItem: { key: 'RaceTimming', icon: 'line graph', content: 'Race timming' }, render: () => <Tab.Pane> <RaceTimming /></Tab.Pane> },
  // { menuItem: { key: 'RaceGraph', icon: 'line graph', content: 'Race graph' }, render: () => <Tab.Pane> <StatsElements /></Tab.Pane> },
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>F1 statistics - {`${this.props.selectedTrack.raceName} Year: ${this.props.selectedTrack.season}`}</title>
          <meta name="description" content={`${this.props.selectedTrack.raceName} Year - ${this.props.selectedTrack.season}`} />
        </Helmet>

         <div>
           <HeaderRaceSeason />
           <Tab panes={panes} />
         </div>

          <Dimmer active={isFeatureRace} onClickOutside={this.handleHide}>
            <Header as='h2' icon inverted>
              <Icon name='heart' />
              Dimmed Message!
            </Header>
          </Dimmer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack,
});
export default connect(mapStateToProps)(DriversPoints);
