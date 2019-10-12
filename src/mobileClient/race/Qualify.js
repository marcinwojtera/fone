import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { List, Badge } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const Qualify = () => {
  const seasonQualify = useSelector(state => state.data.seasonQualify.QualifyingResults);
  const season = useSelector(state => state.navigation.season);

  return (
    <List renderHeader={() => 'Qualify results:'} className="results-list">

      {seasonQualify.map(x => (
        <Item
          key={`${x.number}-${season}`}
          multipleLine
          arrow="horizontal"
          platform="android"
          onClick={() => {}}
        >
          <Badge className="badge-pink" text={(<b>{x.position}</b>)}/> {x.Driver.givenName} {x.Driver.familyName}
          <Brief>
            {x.Q1 ? <span> Q1: {x.Q1} </span> : <span> --- </span>}
            {x.Q2 ? <span> | Q2: {x.Q2} </span> : <span> | --- </span>}
            {x.Q3 ? <span> | Q2: {x.Q3} </span> : <span> | --- </span>}
          </Brief>
        </Item>

      ))}
    </List>
  );
};

export default Qualify;
