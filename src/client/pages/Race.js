import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Dimmer, Step } from 'semantic-ui-react'
import TrackResults from '../components/TrackResults';
import {withRouter, Link} from "react-router-dom";
import UrlWrapper from '../urlWrapper'
import { map } from 'lodash'

class Race extends Component {

  render() {
    return (
      <div>
        <Dimmer.Dimmable as={Segment} dimmed={false}>
          <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column width={3} style={{padding: 0}}>

                <Step.Group size='tiny' fluid vertical style={{height: 400, background: '#fff'}}>

                  {map(this.props.seasonsList, (x, i)=> {
                    return(
                      <Link
                        className="slide-box"
                        key={x.raceName}
                        to={`/race/${this.props.year}/${x.round}`}
                      >

                        <Step active={x.round === this.props.season}>
                          <Step.Content>
                            <Step.Title>{x.raceName}</Step.Title>
                            <Step.Description>
                              <strong>{x.date}</strong>
                              {/*<span className="driver-info">{x.Circuit.circuitName}</span>*/}
                              <span className="driver-info-number">{x.round}</span>
                            </Step.Description>
                          </Step.Content>
                        </Step>

                      </Link>
                    )
                  })}

                </Step.Group>

              </Grid.Column>
              <Grid.Column width={13}>
                {this.props.seasonsResults && <TrackResults />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Dimmer.Dimmable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsResults: state.data.seasonsResults,
  year: state.navigation.year,
  season: state.navigation.season,
  seasonsList: state.data.seasonsList,
});
export default withRouter(UrlWrapper(connect(mapStateToProps)(Race)));

