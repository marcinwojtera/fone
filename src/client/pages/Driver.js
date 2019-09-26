import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter, Link} from "react-router-dom";
import { Dimmer, Grid, Segment, Step, Icon  } from 'semantic-ui-react'
import UrlWrapper from '../urlWrapper'
import LeftPanel from '../components/LeftPanel'
import DriverHistory from '../components/DriverHistory'
import { map } from 'lodash'

class Driver extends Component {
  render() {
    return (
      <div>
        <Dimmer.Dimmable as={Segment} dimmed={false}>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={3} style={{padding: 0}}>

              <Step.Group size='tiny' fluid vertical>

                {map(this.props.seasonsDrivers, (x, i)=> {
                  return(
                    <Link
                      className="slide-box"
                      key={x.Driver.givenName}
                      to={`/driver/${x.Driver.driverId}/${this.props.year}`}
                    >

                      <Step active={this.props.driverId === x.Driver.driverId}>
                        <Step.Content>
                          <Step.Title>{x.Driver.givenName} {x.Driver.familyName}</Step.Title>
                          <Step.Description>
                            <strong>{x.Driver.code}</strong>
                            <span className="driver-info">{x.Constructors[0].name}</span>
                            <span className="driver-info-number">{x.Driver.permanentNumber}</span>
                          </Step.Description>
                        </Step.Content>
                      </Step>

                       </Link>
                  )
                })}

              </Step.Group>

            </Grid.Column>
            <Grid.Column width={13}>
              {this.props.driverId && <DriverHistory />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Dimmer.Dimmable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  driverId: state.navigation.driver,
  seasonsDrivers: state.data.seasonsDrivers,
  year: state.navigation.year,
});
export default withRouter(UrlWrapper(connect(mapStateToProps)(Driver)));

