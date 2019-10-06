import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Step } from 'semantic-ui-react';
import UrlWrapper from '../urlWrapper';
import DriverHistory from '../components/DriverHistory';
import LeftMenu from '../components/block/LeftMenu';
import { maps } from '../actions/helper';

const Driver = () => {
  const seasonsDrivers = useSelector(state => state.data.seasonsDrivers);
  const year = useSelector(state => state.navigation.year);
  return (
    <div>
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column width={3} style={{ padding: 0 }}>
            <Step.Group size="tiny" fluid vertical>
              {maps(seasonsDrivers).map(key => (
                <Link
                  className="slide-box"
                  key={`${seasonsDrivers[key].Driver.familyName}-${seasonsDrivers[key].Driver.givenName}-${seasonsDrivers[key].Driver.driverId}`}
                  to={`/driver/${seasonsDrivers[key].Driver.driverId}/${year}`}
                >
                  <LeftMenu driver={seasonsDrivers[key]} />
                </Link>
              ))}
            </Step.Group>
          </Grid.Column>
          <Grid.Column width={13}>
            <DriverHistory />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default UrlWrapper(Driver);
