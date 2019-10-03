import React from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import QualifyBlock from './race/QualifyBlock';
import ResultsBlock from './race/ResultsBlock';
import TrackBlock from './race/TrackBlock';
import RaceTimming from './race/RaceTimming';
import PitStops from './race/PitStops';
import TrackHistory from './TrackHistory';
import HeaderRaceSeason from './race/HeaderRaceSeason';

const panes = [
  { menuItem: { key: 'Results', icon: 'winner', content: 'Results' }, render: () => <Tab.Pane><ResultsBlock /></Tab.Pane> },
  { menuItem: { key: 'Qualify', icon: 'flag checkered', content: 'Qualify' },
    render: () => (
      <Tab.Pane>
        <QualifyBlock />
      </Tab.Pane>
    ) },
  { menuItem: { key: 'Pit Stops', icon: 'wait', content: 'Pit Stops' },
    render: () => (
      <Tab.Pane>
        <PitStops />
      </Tab.Pane>
    ) },
  { menuItem: { key: 'RaceTimming', icon: 'line graph', content: 'Race timming' },
    render: () => (
      <Tab.Pane>
        <RaceTimming />
      </Tab.Pane>
    ) },
  { menuItem: 'Track info', render: () => <Tab.Pane><TrackBlock /></Tab.Pane> },
];


const TrackResults = ({ selectedTrack }) => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        F1 statistics -
        {`${selectedTrack.raceName} Year: ${selectedTrack.season}`}
      </title>
      <meta name="description" content={`${selectedTrack.raceName} Year - ${selectedTrack.season}`} />
    </Helmet>
    <div>
      <HeaderRaceSeason />
      <TrackHistory />
      <Tab panes={panes} />
    </div>
  </div>
);


const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack,
});
export default connect(mapStateToProps)(TrackResults);
