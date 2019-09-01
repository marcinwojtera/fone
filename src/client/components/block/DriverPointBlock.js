import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react'
import DriverRow from "./DriverRow";

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
              <Table striped color='purple'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Point</Table.HeaderCell>
                    <Table.HeaderCell>Wins</Table.HeaderCell>
                    <Table.HeaderCell>Driver</Table.HeaderCell>

                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.seasonsDrivers.map(x => (
                    <Table.Row key={x.position}>
                      <Table.Cell>{x.points} </Table.Cell>
                      <Table.Cell>{x.wins}</Table.Cell>
                      <Table.Cell><DriverRow driver={x}/></Table.Cell>
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
  seasonsDrivers: state.data.seasonsDrivers
});
export default connect(mapStateToProps)(DriverPointBlock);
