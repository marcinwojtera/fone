import React from 'react'
import { Segment } from 'semantic-ui-react'
import { map } from 'lodash'

const RetiresInfo = ({ stats }) => {
  return (
    <div>
      <small><strong>RETIRES: {' '}</strong> </small>
      <Segment vertical>

        {map(stats.status, (stat, num) => (
          <span style={{ marginRight: '10px'}} key={num}>
            <span style={{ marginRight: '5px'}}  >
              <strong>{stat}</strong>
            </span>
            {num}
          </span>
        ))}
      </Segment>
    </div>
  )
}

export default RetiresInfo;
