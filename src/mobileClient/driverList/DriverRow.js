import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { fetchData } from '../../client/actions';

const Item = List.Item;
const Brief = Item.Brief;

const DriverRow = ({ driverId, history }) => {
  const constructor = useSelector(state => {
    return state.data.seasonsDrivers[driverId].Constructors[0];
  });
  const driver = useSelector(state => state.data.seasonsDrivers[driverId]);
  const year = useSelector(state => state.navigation.year);
  const dispatch = useDispatch();

  const loadDriver = () =>{
    const url = `/driver/${driverId}/${year}`;
    history.push(url);
    dispatch(fetchData(url));
  }

  return (
    <Item
      extra={<Badge className="badge-pink" text={driver.points} size="large" overflowCount={driver.points}/>}
      align="top"
      multipleLine
      arrow="horizontal"
      platform="android"
      onClick={() => loadDriver()}
    >
      {<span>{driver.Driver.givenName} {driver.Driver.familyName}</span>}
      <Brief>{<span>{constructor.name}</span>}</Brief>
    </Item>
  );
};

export default withRouter(DriverRow);
