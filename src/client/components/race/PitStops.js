import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Grid } from 'semantic-ui-react';
import DriverRow from '../block/DriverRow';

const PitStops = () => {
  const seasonsPitStop = useSelector(state => state.data.seasonsPitStop.PitStops);
  return (
    <div>
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column width={16}>
            <Table striped color="purple" selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: 60 }}>Lap</Table.HeaderCell>
                  <Table.HeaderCell>Driver</Table.HeaderCell>
                  <Table.HeaderCell>Stops</Table.HeaderCell>
                  <Table.HeaderCell>Time</Table.HeaderCell>
                  <Table.HeaderCell>Duration</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {seasonsPitStop.map(pit => (
                  <Table.Row key={`${pit.time}-${pit.driverId}${pit.duration}`}>
                    <Table.Cell>
                      <b>{pit.lap}{' '}</b>
                    </Table.Cell>
                    <Table.Cell><DriverRow driver={pit.driverId} /></Table.Cell>
                    <Table.Cell>{pit.stop}</Table.Cell>
                    <Table.Cell>{pit.time}</Table.Cell>
                    <Table.Cell>{pit.duration}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default PitStops;

