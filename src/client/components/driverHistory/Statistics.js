import React from 'react'
import { Breadcrumb, Segment, Statistic } from 'semantic-ui-react'
import {connect} from "react-redux";

const Statistics = ({ stats }) => (
  <Segment vertical>
    <Statistic.Group size={'mini'} color='purple' widths={5}>
      <Statistic>
        <Statistic.Value>{stats.won}</Statistic.Value>
        <Statistic.Label>Won</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{stats.pole}</Statistic.Value>
        <Statistic.Label>Pole position</Statistic.Label>
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
)



export default Statistics
