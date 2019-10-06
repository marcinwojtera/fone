import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Table, Label, Icon } from 'semantic-ui-react';
import DriverRow from '../block/DriverRow';


const ResultsBlock = () => {
  const seasonsResults = useSelector(state => {
    return state.data.seasonsResults ? state.data.seasonsResults.Results : [];
  });
  const season = useSelector(state => state.navigation.season);

  return (
    <div>
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column width={16}>
            <Table striped color="purple" selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: 60 }}>Place</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: 60 }}>Points</Table.HeaderCell>
                  <Table.HeaderCell>Driver</Table.HeaderCell>
                  <Table.HeaderCell>Grid</Table.HeaderCell>
                  <Table.HeaderCell>Fastest lap</Table.HeaderCell>
                  <Table.HeaderCell>Av speed</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {seasonsResults.map(x => (
                  <Table.Row key={`${x.number}-${season}`} error={x.positionText == 'R'}>
                    <Table.Cell>
                      {x.positionText == 'R' ? <Label ribbon color="red">R</Label>
                        : (
                          <span>
                              <small className="grid-place">
                                {x.grid - x.position == 0 && <Icon name="minus" />}
                                {x.grid - x.position > 0 && <Icon name="caret up" />}
                                {x.grid - x.position < 0 && <Icon name="caret down" />}
                              </small>
                              <b>{x.position}</b>
                            </span>
                        )}
                    </Table.Cell>
                    <Table.Cell>
                      {x.points !== '0' ? (
                        <span>
                            +
                          {x.points}
                          </span>
                      ) : <span>0</span>}
                    </Table.Cell>
                    <Table.Cell><DriverRow driver={x.Driver.driverId} /></Table.Cell>
                    <Table.Cell>{x.grid}</Table.Cell>
                    <Table.Cell>
                      {x.FastestLap && (
                        <span className="driver-box">
                          {x.FastestLap.Time.time}
                          <span className="lap-place-box">
                            Lap:
                            {x.FastestLap.lap}
                            , Time rank:
                            {x.FastestLap.rank}
                          </span>
                        </span>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {x.FastestLap && (
                        <span>
                          {x.FastestLap.AverageSpeed.speed}
                          {' '}
                          <small>km/h</small>
                        </span>
                      )}
                    </Table.Cell>
                    <Table.Cell>{x.status}</Table.Cell>
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
};

export default ResultsBlock;
