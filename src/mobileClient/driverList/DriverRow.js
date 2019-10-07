import React from 'react';
import { useSelector } from 'react-redux';
import { Badge, List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const DriverRow = ({ driverId }) => {
  const constructor = useSelector(state => {
    return state.data.seasonsDrivers[driverId].Constructors[0];
  });
  const driver = useSelector(state => state.data.seasonsDrivers[driverId]);
  return (

    <Item

      extra={<Badge className="badge-pink" text={driver.points} size="large" overflowCount={driver.points}/>}
      align="top"
      multipleLine
      arrow="horizontal"
      platform="android"
      onClick={() => {}}
    >
      {<span>{driver.Driver.givenName} {driver.Driver.familyName}</span>}
      <Brief>{<span>{constructor.name}</span>}</Brief>
    </Item>

  );
};

export default DriverRow;

{/*<Card full>*/}
{/*<Card.Header*/}
{/*title=*/}
{/*extra=*/}
{/*/>*/}
{/*<Card.Footer content='sssss' extra={<div>ddddd</div>} />*/}
{/*</Card>*/}
