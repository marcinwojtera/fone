import React from 'react';
import { Segment } from 'semantic-ui-react';
import { maps } from '../../actions/helper';

const RetiresInfo = ({ stats }) => (
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

export default RetiresInfo;
