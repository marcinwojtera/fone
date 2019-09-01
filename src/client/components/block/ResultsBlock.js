import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Table, Label, Icon} from 'semantic-ui-react';
import DriverRow from "./DriverRow";

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
              <Table striped color='purple'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell style={{width:60}}>Place</Table.HeaderCell>
                    <Table.HeaderCell style={{width:60}}>Laps</Table.HeaderCell>
                    <Table.HeaderCell>Driver</Table.HeaderCell>
                    <Table.HeaderCell>Constructor</Table.HeaderCell>
                    <Table.HeaderCell>Grid</Table.HeaderCell>
                    <Table.HeaderCell>Fastest lap</Table.HeaderCell>
                    <Table.HeaderCell>Av speed</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.seasonsResults.map(x => (
                    <Table.Row key={x.number} error={x.positionText == 'R'}>
                      <Table.Cell>
                        {x.positionText == 'R' ? <Label ribbon color={'red'}>R</Label> :
                          <span>
                               <small className="grid-place">
                                {x.grid - x.position == 0 && <Icon name="minus" />}
                                {x.grid - x.position > 0 && <Icon name="caret up" />}
                                {x.grid - x.position < 0 && <Icon name="caret down" />}
                              </small>
                            <b>{x.position}</b>
                          </span>}
                      </Table.Cell>
                      <Table.Cell>{x.laps}</Table.Cell>
                      <Table.Cell><DriverRow driver={x}/></Table.Cell>
                      <Table.Cell>{x.Constructor.name}</Table.Cell>
                      <Table.Cell>{x.grid}</Table.Cell>
                      <Table.Cell>{x.FastestLap && x.FastestLap.Time.time}</Table.Cell>
                      <Table.Cell>{x.FastestLap && <span>{x.FastestLap.AverageSpeed.speed} km/h</span>}</Table.Cell>
                      <Table.Cell>{x.status}</Table.Cell>
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
