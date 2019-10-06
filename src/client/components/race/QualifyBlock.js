import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Grid } from 'semantic-ui-react';
import DriverRow from '../block/DriverRow';

const QualifyBlock = () => {
  const seasonQualify = useSelector(state => state.data.seasonQualify.QualifyingResults);
  return (
    <div>
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={16}>
            <Table striped color='purple' selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{width: 60}}>Place</Table.HeaderCell>
                  <Table.HeaderCell>Driver</Table.HeaderCell>
                  <Table.HeaderCell>Q1</Table.HeaderCell>
                  <Table.HeaderCell>Q2</Table.HeaderCell>
                  <Table.HeaderCell>Q3</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {seasonQualify.map(x => (
                  <Table.Row key={x.number + '-' + x.position}>
                    <Table.Cell><b>{x.position} </b></Table.Cell>
                    <Table.Cell><DriverRow driver={x.Driver.driverId}/></Table.Cell>
                    <Table.Cell>{x.Q1 && x.Q1}</Table.Cell>
                    <Table.Cell negative={!x.Q2}>{x.Q2 && x.Q2}</Table.Cell>
                    <Table.Cell negative={!x.Q3}>{x.Q3 && x.Q3}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default QualifyBlock;
