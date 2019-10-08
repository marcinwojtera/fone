import React from 'react';
import { useSelector } from 'react-redux';
import { List, Tabs, Badge } from 'antd-mobile';
import DriverRow from '../driverList/DriverRow';
import ConstructorRow from '../driverList/ConstructorRow';
import { maps } from '../../client/actions/helper';

const Home = () => {
  const seasonsDrivers = useSelector(state => state.data.seasonsDrivers);
  const seasonConstructors = useSelector(state => state.data.seasonConstructors);

  const tabs = [
    { title: <Badge>Drivers</Badge> },
    { title: <Badge>Constructors</Badge> },
  ];

  return (
    <Tabs
      tabs={tabs}
      initialPage={0}
      onChange={(tab, index) => { console.log('onChange', index, tab); }}
      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >
      <div style={{ backgroundColor: '#fff' }}>
        <List renderHeader={() => 'Drivers:'} className="my-list">
          {maps(seasonsDrivers)
            .map(driver => (
              <DriverRow driverId={driver} />
            ))}
        </List>
      </div>
      <div style={{ backgroundColor: '#fff' }}>
        <List renderHeader={() => 'Constructors:'} className="my-list">
          {seasonConstructors.map(constructor => (
            <ConstructorRow constructor={constructor} />
          ))}
        </List>
      </div>
    </Tabs>

  );
};

export default Home;
