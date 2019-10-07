import React from 'react';
import { List, Card, WhiteSpace, WingBlank, Picker, TabBar } from 'antd-mobile';
import { Icon } from 'semantic-ui-react';
import './app.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchData, fetchTrack, fetchTrackMedia } from '../client/actions';

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
    this.showNextRace();
  }

  componentDidUpdate(prevProps, prevState) {
    if((this.state.year !== prevState.year) || (this.state.track !== prevState.track)) {
      this.loadData();
    }
  }
  seasons = () => {
    return [this.props.seasonsYears.map(x => ({label: x, value: x}))]
  }

  tracks = () => {
    return [this.props.seasonsList.map(x => ({label: x.raceName, value: x.round}))]
  }

  onChangeYear = (year) => {
    this.setState({ year });
  };

  onChangeTrack = (track) => {
    this.setState({ track });
  };

  loadData = () => {
    const url = `/race/${this.state.year}/${this.state.track}`;
    this.props.dispatch(fetchData(url))
  }

  showNextRace = () => {
    const dateNow = new Date();
    const circInfo = this.props.seasonsList.find(x => +dateNow <= +new Date(x.date))
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
            okText={'Ok'}
            dismissText={'Cancel'}
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
            okText={'Ok'}
            dismissText={'Cancel'}
            cascade={false}
            extra={this.props.selectedTrack.raceName}
            value={this.state.track}
            cols={1}
            onOk={(track) => this.onChangeTrack(track)}
          >
            <List.Item arrow="horizontal">Track</List.Item>
          </Picker>
        </div>

      <div style={{ position: 'absolute', height: 'calc(100% - 45px)', width: '100%', top: 135, bottom: 45 }}>

          <Card full>
            <Card.Header
              title="NEXT RACE:"
              extra={<span>{this.state.nextTrack.date}</span>}
            />
            <Card.Body>
              <div>
                {this.props.trackImg && <img src={this.props.trackImg.original.source} style={{ width: '100%' }} />}
              </div>
            </Card.Body>
            <Card.Footer content={this.state.nextTrack && this.state.nextTrack.Circuit.circuitName} extra={<div>{this.state.nextTrack.raceName}</div>} />
          </Card>


        <Card full>
          <Card.Header
            title="NEXT RACE:"
            extra={<span>{this.state.nextTrack.date}</span>}
          />
          <Card.Body>
            <div>
              {this.props.trackImg && <img src={this.props.trackImg.original.source} style={{ width: '100%' }} />}
            </div>
          </Card.Body>
          <Card.Footer content={this.state.nextTrack && this.state.nextTrack.Circuit.circuitName} extra={<div>{this.state.nextTrack.raceName}</div>} />
        </Card>
        <Card full>
          <Card.Header
            title="NEXT RACE:"
            extra={<span>{this.state.nextTrack.date}</span>}
          />
          <Card.Body>
            <div>
              {this.props.trackImg && <img src={this.props.trackImg.original.source} style={{ width: '100%' }} />}
            </div>
          </Card.Body>
          <Card.Footer content={this.state.nextTrack && this.state.nextTrack.Circuit.circuitName} extra={<div>{this.state.nextTrack.raceName}</div>} />
        </Card>
        <Card full>
          <Card.Header
            title="NEXT RACE:"
            extra={<span>{this.state.nextTrack.date}</span>}
          />
          <Card.Body>
            <div>
              {this.props.trackImg && <img src={this.props.trackImg.original.source} style={{ width: '100%' }} />}
            </div>
          </Card.Body>
          <Card.Footer content={this.state.nextTrack && this.state.nextTrack.Circuit.circuitName} extra={<div>{this.state.nextTrack.raceName}</div>} />
        </Card>

        <Card full>
          <Card.Header
            title="DRIVERS:"
            extra={<span>{this.state.nextTrack.date}</span>}
          />
          <Card.Body>
            <div>
            dfdfdf
            </div>
          </Card.Body>
          <Card.Footer content="footer content" extra={<div>{this.state.nextTrack.raceName}</div>} />
        </Card>

        <div>

        </div>

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
});

export default withRouter(connect(mapStateToProps)(App));



// <TabBar
//             prerenderingSiblingsNumber={0}
//             unselectedTintColor="#949494"
//             tintColor="#33A3F4"
//             barTintColor="white"
//             hidden={this.state.hidden}
//           >
//             <TabBar.Item
//               title="Seasons"
//               key="seasons"
//               icon={<Icon name='users' />}
//               selectedIcon={<Icon disabled name='users' />}
//               selected={this.state.selectedTab === 'seasons'}
//               badge={1}
//               onPress={() => {
//                 this.setState({
//                   selectedTab: 'seasons',
//                 });
//               }}
//               data-seed="logId"
//             />
//
//             <TabBar.Item
//               icon={<Icon name='flag checkered' />}
//               selectedIcon={<Icon disabled name='flag checkered' />}
//               title="Drivers"
//               key="drivers"
//               selected={this.state.selectedTab === 'drivers'}
//               onPress={() => {
//                 this.setState({
//                   selectedTab: 'drivers',
//                 });
//               }}
//             />
//
//             <TabBar.Item
//               title="Constructors"
//               key="constructors"
//               icon={<Icon name='users' />}
//               selectedIcon={<Icon disabled name='users' />}
//               selected={this.state.selectedTab === 'constructors'}
//               badge={1}
//               onPress={() => {
//                 this.setState({
//                   selectedTab: 'constructors',
//                 });
//               }}
//               data-seed="logId"
//             />
//           </TabBar>
