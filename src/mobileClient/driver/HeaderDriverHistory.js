import React from 'react';
import { Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { WingBlank } from 'antd-mobile';

const HeaderDriverHistory = () => {
  const seasonsDrivers = useSelector(state => state.data.seasonsDrivers[state.navigation.driverId] || []);
  return seasonsDrivers ? (
    <WingBlank size="lg">
      <Header as="h3">
        <Header.Content>
          <span>
            {seasonsDrivers.Driver.givenName}
            {' '}
          </span>
          <span>{seasonsDrivers.Driver.familyName}</span>
          <Header.Subheader>
            <small>
            Nr:
              {seasonsDrivers.Driver.permanentNumber}
              {' '}
              | Code:
              {seasonsDrivers.Driver.code}
              <span>

              | Nationality:
                {seasonsDrivers.Driver.nationality}
              </span>
            </small>
          </Header.Subheader>
        </Header.Content>
      </Header>
    </WingBlank>
  ) : null;
};

export default HeaderDriverHistory;
