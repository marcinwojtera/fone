import React from 'react';
import { List, Card, WhiteSpace, Badge, Picker, Tabs } from 'antd-mobile';
import { Icon } from 'semantic-ui-react';
import './app.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchData, fetchTrackMedia } from '../client/actions';
import { maps } from '../client/actions/helper';
import DriverRow from './driverList/DriverRow';
import ConstructorRow from './driverList/ConstructorRow';


const tabs = [
  { title: <Badge>Drivers</Badge> },
  { title: <Badge>Constructors</Badge> },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: [props.year],
      track: [props.selectedTrack.round],
      nextTrack: false,
    };
  }

  componentDidMount() {
    this.props.isHomeView && this.showNextRace();
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.state.year !== prevState.year) || (this.state.track !== prevState.track)) {
      this.loadData();
    }
  }

  seasons = () => [this.props.seasonsYears.map(x => ({
    label: x,
    value: x
  }))];

  tracks = () => [this.props.seasonsList.map(x => ({
    label: x.raceName,
    value: x.round
  }))];

  onChangeYear = (year) => {
    this.setState({ year });
  };

  onChangeTrack = (track) => {
    this.setState({ track });
  };

  loadData = () => {
    const url = `/race/${this.state.year}/${this.state.track}`;
    this.props.dispatch(fetchData(url));
  }

  showNextRace = () => {
    const dateNow = new Date();
    const circInfo = this.props.seasonsList.find(x => +dateNow <= +new Date(x.date));
    if (circInfo) {
      this.setState({ nextTrack: circInfo });
      this.props.dispatch(fetchTrackMedia(circInfo.round));
    }
  }

  render() {
    return (
      <div>
        <div className="heads">
          sss
        </div>
        <div className="track-picker">
          <Picker
            data={this.seasons()}
            okText="Ok"
            dismissText="Cancel"
            cascade={false}
            extra={this.props.year}
            value={this.state.year}
            cols={1}
            onOk={(year) => this.onChangeYear(year)}
          >
            <List.Item arrow="horizontal">Year</List.Item>
          </Picker>
          <Picker
            data={this.tracks()}
            okText="Ok"
            dismissText="Cancel"
            cascade={false}
            extra={this.props.selectedTrack.raceName}
            value={this.state.track}
            cols={1}
            onOk={(track) => this.onChangeTrack(track)}
          >
            <List.Item arrow="horizontal">Track</List.Item>
          </Picker>
        </div>

        <div className="next-race">

          {this.props.isHomeView &&
          <Card full>
            <Card.Header
              title="NEXT RACE:"
              extra={<span>{this.state.nextTrack.date}</span>}
            />
            <Card.Body>
              <div>
                {this.props.trackImg && <img src={this.props.trackImg.original.source} style={{ width: '100%' }}/>}
              </div>
            </Card.Body>
            <Card.Footer content={this.state.nextTrack && this.state.nextTrack.Circuit.circuitName} extra={<div>{this.state.nextTrack.raceName}</div>}/>
          </Card>
          }

          <WhiteSpace/>

          <Tabs tabs={tabs}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div style={{ backgroundColor: '#fff' }}>
              <List renderHeader={() => `Drivers:`} className="my-list">
                {maps(this.props.seasonsDrivers)
                  .map(driver => (
                    <DriverRow driverId={driver}/>
                  ))}
              </List>
            </div>
            <div style={{ backgroundColor: '#fff' }}>
              <List renderHeader={() => `Drivers:`} className="my-list">
                {this.props.seasonConstructors.map(constructor => (
                  <ConstructorRow constructor={constructor}/>
                ))}
              </List>
            </div>
          </Tabs>

          <div/>

        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  seasonsYears: state.data.seasonsYears,
  seasonsDrivers: state.data.seasonsDrivers,
  seasonConstructors: state.data.seasonConstructors,
  seasonsList: state.data.seasonsList || [],
  selectedTrack: state.selectedTrack,
  year: state.navigation.year,
  season: state.navigation.season,
  driverId: state.navigation.driverId,
  trackImg: state.loadedTrackHome,
  isHomeView: state.navigation.pageView === 'home',
});

export default withRouter(connect(mapStateToProps)(App));
