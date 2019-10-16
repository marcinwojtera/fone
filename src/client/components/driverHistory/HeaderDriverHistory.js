import React from 'react';
import { Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const HeaderDriverHistory = ({ simple }) => {
  const seasonsDrivers = useSelector(state => state.data.seasonsDrivers[state.navigation.driverId] || []);
  return seasonsDrivers ? (
  <Header as="h3">
    <Header.Content>
      <span>
        {seasonsDrivers.Driver.givenName}
        {' '}
      </span>
      <span>{seasonsDrivers.Driver.familyName}</span>
      <Header.Subheader>
        <span>
        Nr:
          {seasonsDrivers.Driver.permanentNumber}
          {' '}| Code: {seasonsDrivers.Driver.code}
          {!simple && (
            <span> | Nationality: {seasonsDrivers.Driver.nationality}
              {' '} |
                    Date of birth:
              {seasonsDrivers.Driver.dateOfBirth}
          </span>
          )}
        </span>
      </Header.Subheader>
    </Header.Content>
  </Header>
) : null}

export default HeaderDriverHistory;
