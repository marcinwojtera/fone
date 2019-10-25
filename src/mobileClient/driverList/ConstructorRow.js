import React from 'react';
import { Badge, List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const ConstructorRow = ({ constructor }) => {

  return (
    <Item
      extra={<Badge className="badge-pink" text={constructor.points} size="large" overflowCount={constructor.points}/>}
      arrow="horizontal"
      platform="android"
      onClick={() => {}}
    >
      {<span>{constructor.Constructor.name}</span>}
      <Brief>{<span>Wins: {constructor.wins}</span>}</Brief>
    </Item>
  );
};

export default ConstructorRow;
