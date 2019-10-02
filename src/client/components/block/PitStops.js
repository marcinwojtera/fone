import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Grid } from 'semantic-ui-react';
import DriverRow from './DriverRow';

class PitStops extends Component {
  state = {
    rendered: false,
  }

  render() {
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
                  {this.props.seasonsPitStop.map(x => (
                    <Table.Row key={`${x.time}-${x.driverId}${this.props.season}`}>
                      <Table.Cell>
                        <b>
                          {x.lap}
                          {' '}
                        </b>
                      </Table.Cell>
                      <Table.Cell><DriverRow driver={x.driverId} /></Table.Cell>
                      <Table.Cell>{x.stop}</Table.Cell>
                      <Table.Cell>{x.time}</Table.Cell>
                      <Table.Cell>{x.duration}</Table.Cell>
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
}

const mapStateToProps = state => ({
  seasonsPitStop: state.data.seasonsPitStop ? state.data.seasonsPitStop.PitStops : [],
  season: state.navigation.season,
});
export default connect(mapStateToProps)(PitStops);
