import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Table} from 'semantic-ui-react';

class QualifyBlock extends Component {
  state = {
    rendered: false,
  }

  render() {
    return (
      <div>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={16}>
              <Table striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Pos</Table.HeaderCell>
                    <Table.HeaderCell>Driver</Table.HeaderCell>
                    <Table.HeaderCell>Fastest lap</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.seasonsResults.map(x => (
                    <Table.Row key={x.number}>
                      <Table.Cell>{x.position} </Table.Cell>
                      <Table.Cell>{x.Driver.givenName} {x.Driver.familyName} <i>{x.Constructor.name}</i> {x.number}</Table.Cell>
                      <Table.Cell>{x.FastestLap && x.FastestLap.Time.time}</Table.Cell>
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
  seasonsResults: state.data.seasonsResults ? state.data.seasonsResults.Results : [],
});
export default connect(mapStateToProps)(QualifyBlock);
