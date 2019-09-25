import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { find, map } from 'lodash';
import { Grid, Label } from 'semantic-ui-react'
import { fetchTrack, fetchTrackYearAgo } from '../actions'
import RaceYearAgo from '../components/homePage/RaceYearAgo';

class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      seconds: '00',   // responsible for the seconds
      minutes: '',
      nextTrack: false,
    }
  }
  componentDidMount () {
    this.showNextRace()
  }
  showNextRace = () => {
    const dateNow = new Date()
    const circInfo = find(this.props.seasonsList, (x => +dateNow <= +new Date(x.date) ));
    console.log(circInfo)
    if (circInfo) {
      this.setState({nextTrack: circInfo})
      this.props.dispatch(fetchTrackYearAgo(circInfo.season, circInfo.round, circInfo.Circuit.circuitId))
      this.props.dispatch(fetchTrack(circInfo.round))
    }

  }
  showConstructors = () => {
    return map(this.props.seasonConstructors, (x => (
      <div key={x.Constructor.name}>
        <Label size={'mini'}>{x.points || 0}</Label>
        <span>{x.Constructor.name}</span>
      </div>
    )))
  }

  showDrivers = (withPlace) => {
    return map(this.props.seasonsDrivers, (x => (
      <div key={x.Driver.givenName}>
        {withPlace && <Label size={'mini'}>{x.points || 0}</Label>}
        <Link
          className="slide-box"
          to={`/driver/${x.Driver.driverId}/${this.props.navigation.year}`}
        >
          <span>{x.Driver.givenName} {x.Driver.familyName}</span>
        </Link>
      </div>
    )))
  }
  render() {
    return (
      <div className='home-page-container'>

        <div className='home-panel'>
          <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column width={10}>
                <div className='home-driver-panel'>{this.showDrivers(true)}</div>
                <hr/>
                <div  className='home-constructor-panel'>{this.showConstructors()}</div>
              </Grid.Column>
              <Grid.Column width={6} className='next-panel'>
                <div><small><strong>NEXT RACE: </strong></small></div>
                <div  className='home-next-panel'>

                  <div>
                    <h3>{this.state.nextTrack.raceName}</h3>
                    <h4>{this.state.nextTrack && this.state.nextTrack.Circuit.circuitName}</h4>
                    <Label size={'large'}>
                      12:45:33
                    </Label>
                  </div>

                  <div>
                    {this.props.trackImg && <img src={this.props.trackImg.source}/>}
                  </div>

                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid celled='internally' style={{borderTop: '1px solid #d4d4d4'}}>
            <Grid.Row>
              <Grid.Column width={16} >
                <div><small><strong>RACE RESULTS: </strong></small></div>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid celled='internally' style={{height: '100%', borderTop: '1px solid #d4d4d4'}}>
            <Grid.Row>
              <Grid.Column width={5} style={{height: 'calc(100% - 598px)'}}>
                <div><small><strong>RACE RESULTS: </strong></small></div>

              </Grid.Column>
              <Grid.Column width={5} style={{height: 'calc(100% - 598px)'}}>
                <div><small><strong>RACE RESULTS: </strong></small></div>


              </Grid.Column>
              <Grid.Column width={6} className='next-panel race-results'>
                <div><small><strong>YEAR AGO RESULTS: </strong></small></div>
                <div className='home-next-panel home-next-results' style={{height: '100%'}}>
                  <RaceYearAgo historyResults={this.props.historyTrack} />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>


        </div>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  navigation: state.navigation,
  seasonsList: state.data.seasonsList,
  seasonConstructors: state.data.seasonConstructors,
  seasonsDrivers: state.data.seasonsDrivers,
  trackImg: state.loadedTrackHome.originalimage,
  historyTrack: state.historyTrack
});
export default connect(mapStateToProps)(HomePage);
