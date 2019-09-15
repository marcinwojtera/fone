import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import { Dimmer, Grid, Button, Tab, Segment } from 'semantic-ui-react'
import UrlWrapper from '../urlWrapper'
import LeftPanel from '../components/LeftPanel'

class Driver extends Component {

  render() {
    return (
      <div>
        <Dimmer.Dimmable as={Segment} dimmed={false}>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={11}>
              {this.props.driverId}
            </Grid.Column>
            <Grid.Column width={5}>
               <LeftPanel />
              </Grid.Column>
          </Grid.Row>
        </Grid>
        </Dimmer.Dimmable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsDrivers: state.data.seasonsDrivers,
  driverId: state.navigation.driver,
});
export default withRouter(UrlWrapper(connect(mapStateToProps)(Driver)));

