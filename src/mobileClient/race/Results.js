import React from 'react';
import { useSelector } from 'react-redux';
import { List, Badge } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const Results = () => {
  const seasonsResults = useSelector(state => {
    return state.data.seasonsResults ? state.data.seasonsResults.Results : [];
  });
  const season = useSelector(state => state.navigation.season);

  return (
    <List renderHeader={() => 'Race Results:'} className="results-list">
      {seasonsResults.map(x => (
        <Item
          key={`${x.number}-${season}`}
          extra={<span>{x.status}</span>}
          multipleLine
          arrow="horizontal"
          platform="android"
          onClick={() => {}}
        >
          <Badge className="badge-pink" text={(<b>{x.position}</b>)}/> {x.Driver.givenName} {x.Driver.familyName}

          <Brief>
            Pts: {x.points !== '0' ? (
            <span> + {x.points} </span>
          ) : <span>0</span>}
            {x.FastestLap && <span> |{' '} Fastest lap: {x.FastestLap.AverageSpeed.speed}{' '}
            <small>km/h</small></span>}
          </Brief>
        </Item>

      ))}
    </List>
  );
};

export default Results;
