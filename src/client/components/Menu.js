import React, { useState } from 'react';
import { Menu, Popup } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../actions';
import { maps } from '../actions/helper';

const MenuComponent = ({ history }) => {

  const seasonsYears = useSelector(state => state.data.seasonsYears);
  const seasonsDrivers = useSelector(state => state.data.seasonsDrivers);
  const year = useSelector(state => state.navigation.year);
  const season = useSelector(state => state.navigation.season);
  const driverId = useSelector(state => state.navigation.driverId);

  const [activeItem, setActiveMenu] = useState(year);

  const dispatch = useDispatch();

  const handleHompageClick = () => {
    history.push('/');
    setActiveMenu('home');
    dispatch(fetchData('', '/home'));
  }

  const handleDriverChange = (driver) => {
    const url = `/driver/${driver}/${year}`;
    history.push(url);
    setActiveMenu(driver);
  }

  const handleItemClick = (yearToShow) => {
    const url = `/race/${yearToShow}/${season}`;
    history.push(url);
    setActiveMenu(yearToShow);
  }
  return (
    <div>
      <Menu pointing inverted style={{ margin: 0 }}>
        <Menu.Item
          name="home"
          icon="home"
          active={activeItem === 'home'}
          onClick={() => handleHompageClick()}
        />
        {seasonsYears.map((yearToShow) => (
          <Menu.Item
            name={yearToShow.toString()}
            key={yearToShow}
            active={yearToShow == year}
            onClick={() => handleItemClick(yearToShow)}
          >
            {yearToShow}
          </Menu.Item>
        ))}

      </Menu>

      <Menu size="mini" secondary inverted style={{ margin: 0, background: '#22375f' }}>
        <Menu.Item
          name="drivers"
        >
          DRIVERS:
        </Menu.Item>

        <Menu.Menu>
          {maps(seasonsDrivers).map(z => (
            <Menu.Item
              active={driverId === seasonsDrivers[z].Driver.driverId}
              name={seasonsDrivers[z].Driver.code}
              key={seasonsDrivers[z].Driver.code}
              style={{ padding: 0 }}
              onClick={() => handleDriverChange(seasonsDrivers[z].Driver.driverId)}
            >
              <Popup
                trigger={<span>{seasonsDrivers[z].Driver.code}</span>}
                content={(
                  <span>
                      {seasonsDrivers[z].Driver.givenName}
                    {' '}
                    {seasonsDrivers[z].Driver.familyName}
                    </span>
                )}
                position="bottom left"
              />
            </Menu.Item>
          ))
          }
        </Menu.Menu>
      </Menu>
    </div>
  );
};


export default withRouter(MenuComponent);
