import React from 'react'
import { Label, List } from 'semantic-ui-react'
import { map } from 'lodash'

const RetiresInfo = ({ stats }) => {
  return (
    <div><small>
      <Label color={'purple'}>
        <strong>RETIRES</strong>
      </Label>
    </small>
      <List>
        {map(stats.status, (stat, num) => (
          <List.Item key={num}>
            <List.Content>{stat} - {num}</List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default RetiresInfo;
