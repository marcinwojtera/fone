import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Table } from 'semantic-ui-react';
import DriverRow from "./DriverRow";
import { map } from 'lodash'

class DriverPointBlock extends Component {
  state = {
    rendered: false,
  }

  render() {
    return (
      <div>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={16}>
              <Table striped color='purple' selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Point</Table.HeaderCell>
                    <Table.HeaderCell>Driver</Table.HeaderCell>
                    <Table.HeaderCell>Wins</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {map(this.props.seasonsDrivers, x => (
                    <Table.Row key={x.position +'-' +this.props.season}>
                      <Table.Cell>{x.points} </Table.Cell>
                      <Table.Cell><DriverRow driver={x.Driver.driverId}/></Table.Cell>
                      <Table.Cell>{x.wins}</Table.Cell>
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
}

const mapStateToProps = state => ({
  seasonsDrivers: state.data.seasonsDrivers,
  season: state.navigation.season,
});
export default connect(mapStateToProps)(DriverPointBlock);
