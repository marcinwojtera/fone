import React from 'react';
import { Segment } from 'semantic-ui-react';
import { maps, statistics } from '../../actions/helper';
import { useSelector } from 'react-redux';

const RetiresInfo = () => {

  const driverHistory = useSelector(state => state.driverHistory || []);
  const stats = statistics(driverHistory);
  return (
    <div>
      <small>
        <strong>
          RETIRES:
        </strong>
      </small>
      <Segment vertical>
        {maps(stats.status).map((stat, num) => (
          <span style={{ marginRight: '10px' }} key={num}>
          <span style={{ marginRight: '5px' }}>
            <strong>{stat}</strong>
          </span>
            {num}
        </span>
        ))}
      </Segment>
    </div>
  );
}

export default RetiresInfo;
