import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find, map } from 'lodash';
import { Label } from 'semantic-ui-react'
import { fetchTrack } from '../actions'

class HomePage extends Component {

  state = {
    nextTrack: false,
  }

  componentDidMount () {
    this.showNextRace()
  }
  showNextRace = () => {
    const dateNow = new Date()
    const circInfo = find(this.props.seasonsList, (x => +dateNow <= +new Date(x.date) ))
    this.setState({nextTrack: circInfo})
    this.props.dispatch(fetchTrack(circInfo.round))

  }
  showConstructors = () => {
    return map(this.props.seasonConstructors, (x => (
      <div>
        <span>{x.points}</span> <span>{x.Constructor.name}</span>
      </div>
    )))
  }

  showDrivers = () => {
    return map(this.props.seasonsDrivers, (x => (
      <div>
        <span>{x.Driver.givenName} {x.Driver.familyName}</span> <span>{x.points}</span>
      </div>
    )))
  }
  render() {
console.log(this.state.nextTrack)
    return (
      <div>

        <div className="container-driver">
          <div className="drivers">
            <small><strong>DRIVERS</strong></small>
            <small>{this.showDrivers()}</small>
          </div>
        </div>


         <div className="container">
            <div className="comming-race">
              {this.state.nextTrack && <span>
                <h3>{this.state.nextTrack.raceName}</h3>
                  <h4>{this.state.nextTrack.Circuit.circuitName}</h4>
                    <div>
                      <Label color='red' size={'large'}>
                      12:45:33
                    </Label>
                    </div>
              </span>}
              {this.props.trackImg && <img src={this.props.trackImg.source}/>}
            </div>
        </div>


        <div className="container-constructor">
          <div className="constructor">
            <small><strong>CONSTRUCTORS</strong></small>
            <small>{this.showConstructors()}</small>
          </div>
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
