import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react'

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
                    <Table.HeaderCell>Q1</Table.HeaderCell>
                    <Table.HeaderCell>Q2</Table.HeaderCell>
                    <Table.HeaderCell>Q3</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.seasonQualify.map(x => (
                    <Table.Row key={x.number}>
                      <Table.Cell>{x.position} </Table.Cell>
                      <Table.Cell>{x.Driver.givenName} {x.Driver.familyName} <i>{x.Constructor.name}</i> {x.number}</Table.Cell>
                      <Table.Cell>{x.Q1 && x.Q1}</Table.Cell>
                      <Table.Cell>{x.Q2 && x.Q2}</Table.Cell>
                      <Table.Cell>{x.Q3 && x.Q3}</Table.Cell>
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
  seasonQualify: state.data.seasonQualify ? state.data.seasonQualify.QualifyingResults : [],
});
export default connect(mapStateToProps)(QualifyBlock);
