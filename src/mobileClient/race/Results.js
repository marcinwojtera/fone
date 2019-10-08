import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
              extra={<Badge className="badge-pink" text={x.positionText == 'R' ? <Badge color="red">R</Badge>
                :  <b>{x.position}</b>} size="large" overflowCount={x.position}/>}
              multipleLine
            >
              {x.Driver.givenName} {x.Driver.familyName}

              {x.points !== '0' ? (
                <span>
                            +
                  {x.points}
                          </span>
              ) : <span>0</span>}


              <Brief>
                Grid: {x.grid}
                Fastest lap: {x.FastestLap && <span> {x.FastestLap.AverageSpeed.speed}{' '} <small>km/h</small></span>}
                Status: {<span>{x.status}</span>}
              </Brief>

            </Item>

          ))}
    </List>
  );
};

export default Results;
