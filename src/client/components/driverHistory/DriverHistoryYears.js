import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';

import { useSelector } from 'react-redux';

const DriverHistoryYears = ({ history }) => {
  const driverHistory = useSelector(state => state.driverHistory || []);
  const year = useSelector(state => state.navigation.year);
  const driverId = useSelector(state => state.navigation.driverId);

  const [activeItem, setActiveMenu] = useState(year);

  const handleItemClick = (driverYear) => {
    const url = `/driver/${driverId}/${driverYear}`;
    history.push(url);
    setActiveMenu(driverYear);
  };

  return (
    <Menu inverted pointing>
      {map(driverHistory, (data, driverYear) => (
        <Menu.Item
          name={driverYear}
          key={driverYear}
          disabled={!data}
          active={activeItem === driverYear}
          onClick={() => handleItemClick(driverYear)}
        />
      ))
      }
    </Menu>
  );
};

export default withRouter(DriverHistoryYears);

