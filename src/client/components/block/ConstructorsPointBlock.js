import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Table } from 'semantic-ui-react';

class ConstructorsPointBlock extends Component {
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
                    <Table.HeaderCell>Constructor</Table.HeaderCell>
                    <Table.HeaderCell>Wins</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.seasonConstructors.map(x => (
                    <Table.Row key={x.position +'-' +this.props.season}>
                      <Table.Cell>{x.points} </Table.Cell>
                      <Table.Cell>{x.Constructor.name}</Table.Cell>
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
  seasonConstructors: state.data.seasonConstructors,
  season: state.navigation.season,
});
export default connect(mapStateToProps)(ConstructorsPointBlock);
