import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Dimmer, Grid, Segment, Step } from 'semantic-ui-react';
import { map } from 'lodash';
import UrlWrapper from '../urlWrapper';
import DriverHistory from '../components/DriverHistory';
import LeftMenu from '../components/block/LeftMenu';
import PropTypes from 'prop-types';

const Driver = ({ seasonsDrivers, driverId, year }) => driverId ? (
  <div>
    <Dimmer.Dimmable as={Segment} dimmed={false}>
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column width={3} style={{ padding: 0 }}>
            <Step.Group size="tiny" fluid vertical>
              {map(seasonsDrivers, driver => (
                <Link
                  className="slide-box"
                  key={`${driver.Driver.familyName}-${driver.Driver.givenName}-${driver.Driver.driverId}`}
                  to={`/driver/${driver.Driver.driverId}/${year}`}
                >
                  <LeftMenu driver={driver} />
                </Link>
              ))}
            </Step.Group>
          </Grid.Column>
          <Grid.Column width={13}>
            <DriverHistory />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Dimmer.Dimmable>
  </div>
) : null;

Driver.propTypes = {
  driverId: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  seasonsDrivers: PropTypes.arrayOf().isRequired,
};


const mapStateToProps = state => ({
  driverId: state.navigation.driverId,
  seasonsDrivers: state.data.seasonsDrivers,
  year: state.navigation.year,
});
export default withRouter(UrlWrapper(connect(mapStateToProps)(Driver)));
