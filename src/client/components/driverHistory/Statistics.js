import React from 'react';
import { Segment, Statistic } from 'semantic-ui-react';
import { map } from 'lodash';
import { statistics } from '../../actions/helper';

import { useSelector } from 'react-redux';

const Statistics = () => {
  const driverHistory = useSelector(state => state.driverHistory || []);

  const stats = statistics(driverHistory);

  return (
    <div>
      <small>
        <strong>
          STATS:
        </strong>
      </small>
      <Segment vertical>
        <Statistic.Group color="pink" widths={5}>
          <Statistic>
            <Statistic.Value>{stats.won}</Statistic.Value>
            <Statistic.Label>Wins</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{stats.pole}</Statistic.Value>
            <Statistic.Label>Pole positions</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{stats.second}</Statistic.Value>
            <Statistic.Label>Second</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{stats.third}</Statistic.Value>
            <Statistic.Label>Third</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{stats.ret}</Statistic.Value>
            <Statistic.Label>Retires</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>
    </div>
  );
}

export default Statistics;
