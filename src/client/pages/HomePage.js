import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { find, map } from 'lodash';
import { Grid, Label } from 'semantic-ui-react'
import { fetchTrack } from '../actions'

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
    if (circInfo) {
      this.setState({nextTrack: circInfo})
      this.props.dispatch(fetchTrack(circInfo.round))
    }

  }
  showConstructors = () => {
    return map(this.props.seasonConstructors, (x => (
      <div>
        <Label size={'mini'}>{x.points || 0}</Label>
        <span>{x.Constructor.name}</span>
      </div>
    )))
  }

  showDrivers = () => {
    return map(this.props.seasonsDrivers, (x => (
      <div>
        <Label size={'mini'}>{x.points || 0}</Label>
        <Link
          className="slide-box"
          key={x.Driver.givenName}
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
                {/*<div><small><strong>DRIVERS: </strong></small></div>*/}
                <div className='home-driver-panel'>{this.showDrivers()}</div>
                <hr/>
                {/*<div><small><strong>CONSTRUCTORS: </strong></small></div>*/}
                <div  className='home-constructor-panel'>{this.showConstructors()}</div>
              </Grid.Column>
              <Grid.Column width={6} className='next-panel'>
                <div><small><strong>NEXT RACE: </strong></small></div>
                <div  className='home-next-panel'>

                  <div>
                    <h3>{this.state.nextTrack.raceName}</h3>
                    <h4>{this.state.nextTrack && this.state.nextTrack.Circuit.circuitName}</h4>
                    <Label color='white' size={'large'}>
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



          <Grid celled='internally' style={{height: '100%', borderTop: '1px solid #d4d4d4'}}>
            <Grid.Row>
              <Grid.Column width={10}>
              hjjhgjhg
              </Grid.Column>
              <Grid.Column width={6} className='next-panel'>
                <div><small><strong>NEXT RACE: </strong></small></div>
                <div  className='home-next-panel'>

                tststst

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
  trackImg: state.loadedTrackHome.originalimage
});
export default connect(mapStateToProps)(HomePage);
