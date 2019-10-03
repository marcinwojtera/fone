import React from 'react';
import { Label } from 'semantic-ui-react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { fetchDriverToCompare } from '../../actions';

const DriverList = ({ seasonsDrivers, driverId, loadedCompareDriver, fetchDriverToCompare }) => (
  <div>
    <small>
      <strong>
        COMPARE WITH:
      </strong>
      <br />
      <br />
      {map(seasonsDrivers, (driver, indexId) => driverId !== indexId && (
        <Label
          className="driver-list-history"
          as="a"
          key={`${indexId}-${driver.Driver.givenName}`}
          onClick={() => fetchDriverToCompare(indexId)}
          color={loadedCompareDriver[indexId] ? 'pink' : null}
        >
          {driver.Driver.givenName}
          {' '}
          {driver.Driver.familyName}
        </Label>
      ))}
    </small>
  </div>
);

const mapDispatchToProps = { fetchDriverToCompare };

const mapStateToProps = state => ({
  seasonsDrivers: state.data.seasonsDrivers,
  loadedCompareDriver: state.loadedCompareDriver,
  driverId: state.navigation.driverId,
});
export default connect(mapStateToProps, mapDispatchToProps)(DriverList);
