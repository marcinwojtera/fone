import React from 'react';
import { useSelector } from 'react-redux';
import { List, Tabs, Badge } from 'antd-mobile';
import { maps } from '../../client/actions/helper';
import DriverRow from '../driverList/DriverRow';
import ConstructorRow from '../driverList/ConstructorRow';
import FeatureRace from './FeatureRace';

const Home = () => {
  const seasonsDrivers = useSelector(state => state.data.seasonsDrivers);
  const seasonConstructors = useSelector(state => state.data.seasonConstructors);

  const tabs = [
    { title: <Badge>Drivers</Badge> },
    { title: <Badge>Constructors</Badge> },
  ];

  return (
    <>
      <FeatureRace/>
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
                <DriverRow driverId={driver} key={driver}/>
              ))}
          </List>
        </div>
        <div style={{ backgroundColor: '#fff' }}>
          <List renderHeader={() => 'Constructors:'} className="my-list">
            {seasonConstructors.map(constructor => (
              <ConstructorRow constructor={constructor} key={constructor}/>
            ))}
          </List>
        </div>
      </Tabs>
    </>
  );
};

export default Home;
