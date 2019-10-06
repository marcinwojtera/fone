import React from 'react';
import { Label } from 'semantic-ui-react';
import { map } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDriverToCompare } from '../../actions';

const DriverList = () => {
  const dispatch = useDispatch();

  const seasonsDrivers = useSelector(state => state.data.seasonsDrivers);
  const loadedCompareDriver = useSelector(state => state.loadedCompareDriver);
  const driverId = useSelector(state => state.navigation.driverId);
  return (
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
            onClick={() => dispatch(fetchDriverToCompare(indexId))}
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
}

export default DriverList;
