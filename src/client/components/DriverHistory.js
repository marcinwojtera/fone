import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, filter } from 'lodash';
import { Grid, Header, Label, Segment, Table, Icon, Button } from 'semantic-ui-react';
import Statistics from './driverHistory/Statistics';
import RetiresInfo from './driverHistory/RetiresInfo';
import DriverChart from './driverHistory/DriverChart';
import HeaderDriverHistory from './driverHistory/HeaderDriverHistory';
import DriverColumnView from './driverHistory/DriverColumnView';
import { calculateChart } from '../actions/helper';
import DriverList from './driverHistory/DriverList';
import DriverHistoryYears from './driverHistory/DriverHistoryYears';

class DriverHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.year,
      chartSelectedYears: [props.year],
      columnView: false,
      resultView: true,
      qualiView: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.driverId !== prevProps.driverId) {
      this.setState({ chartSelectedYears: [this.props.year] });
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  selectChartYear = (year) => {
    let selectedYears = this.state.chartSelectedYears;
    const filterExist = selectedYears.indexOf(year) >= 0;

    if (filterExist) {
      selectedYears = filter(this.state.chartSelectedYears, (n => n !== year));
    } else {
      selectedYears.push(year);
    }

    this.setState({ chartSelectedYears: selectedYears });
  }

  calculateDataChart = () => calculateChart(this.props.driverHistory, this.props.loadedCompareDriver, this.state.chartSelectedYears, this.props.driverId, this.state.qualiView)

  columnViewToggle = () => {
    this.setState({ columnView: !this.state.columnView });
  }

  resultViewToggle = () => {
    this.setState({ resultView: true, qualiView: false });
  }

  qualiViewToggle = () => {
    this.setState({ resultView: false, qualiView: true });
  }

  render() {
    const { activeItem } = this.state;
    const seasons = !!this.props.driverHistory[this.props.year] ? this.props.driverHistory[this.props.year].drivers : [];

    return (
      <div>
        {this.props.driverId && <HeaderDriverHistory />}
        <Segment loading={this.props.pageLoader} >

          <Grid celled="internally" padded="vertically">
            <Grid.Row>
              <Grid.Column width={13}>

                <small>
                  <strong>
                    YEAR:
                  </strong>

                  {map(this.props.driverHistory, (data, year) => data && (
                    <Button
                      color={this.state.chartSelectedYears.indexOf(year) >= 0 ? 'pink' : null}
                      size="mini"
                      name={year}
                      key={year}
                      disabled={!data}
                      style={{ padding: '5px 8px' }}
                      onClick={() => this.selectChartYear(year)}
                    >
                      {year}
                    </Button>
                  ))
                  }

                  <Label style={{ float: 'right', cursor: 'pointer', padding: '5px 8px' }} onClick={this.columnViewToggle}>
                    {this.state.columnView ? (
                      <span>
                        <Icon name="zoom-in" />
                      Chart view
                      </span>
                    ) : (
                      <span>
                        <Icon name="zoom-in" />
                        Column view
                      </span>
                    )}
                  </Label>

                  <Label color={this.state.qualiView ? 'pink' : null} style={{ float: 'right', cursor: 'pointer', padding: '5px 8px' }} onClick={this.qualiViewToggle}>
                    <span>
                      <Icon name="flag outline" />
                      Qualify position
                    </span>
                  </Label>

                  <Label color={this.state.resultView ? 'pink' : null} style={{ float: 'right', cursor: 'pointer', padding: '5px 8px' }} onClick={this.resultViewToggle}>
                    <span>
                      <Icon name="flag checkered" />
                      Race position
                    </span>
                  </Label>

                  <br />

                  {this.state.chartSelectedYears.length > 0
                    ? (
                      <span>
                        {this.state.columnView
                          ? <DriverColumnView data={this.calculateDataChart()} />
                          : (
                            <DriverChart
                              key={this.state.chartSelectedYears}
                              height={390}
                              data={this.calculateDataChart()}
                            />
                          )
                        }
                      </span>
                    ) : (
                      <Segment placeholder>
                        <Header icon>
                          <Icon name="info" />
                        Please select at least one year.
                        </Header>
                      </Segment>
                    )
                  }

                </small>
                <Statistics />
                <br />
                <RetiresInfo />
              </Grid.Column>
              <Grid.Column width={3}>
                <DriverList />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <DriverHistoryYears />

          <Table definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ width: 200 }} />
                <Table.HeaderCell style={{ width: 60 }}>Place</Table.HeaderCell>
                <Table.HeaderCell style={{ width: 60 }}>Points</Table.HeaderCell>
                <Table.HeaderCell>Grid</Table.HeaderCell>
                <Table.HeaderCell>Fastest lap</Table.HeaderCell>
                <Table.HeaderCell>Av speed</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {seasons.map(x => (
                <Table.Row key={x.circuit.raceName} error={x.data.positionText == 'R'}>
                  <Table.Cell>{x.circuit.raceName}</Table.Cell>
                  <Table.Cell>
                    {x.data.positionText == 'R' ? <Label ribbon color="red">R</Label>
                      : (
                        <span>
                          <b>{x.data.position}</b>
                        </span>
                      )}
                  </Table.Cell>
                  <Table.Cell>
                    {x.data.points !== '0' ? (
                      <span>
+
                        {x.data.points}
                      </span>
                    ) : <span>0</span>}
                  </Table.Cell>
                  <Table.Cell>{x.data.grid}</Table.Cell>
                  <Table.Cell>

                    {x.data.FastestLap && (
                      <span className="driver-box">
                        {x.data.FastestLap.Time.time}
                        <span className="lap-place-box">
                          Lap:
                          {x.data.FastestLap.lap}
                          , Time rank:
                          {x.data.FastestLap.rank}
                        </span>
                      </span>
                    )}

                  </Table.Cell>
                  <Table.Cell>
                    {x.data.FastestLap && (
                      <span>
                        {x.data.FastestLap.AverageSpeed.speed}
                        {' '}
                        <small>km/h</small>
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell>{x.data.status}</Table.Cell>
                </Table.Row>
              ))
              }

            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  year: state.navigation.year,
  seasons: !!state.driverHistory[state.navigation.year] ? state.driverHistory[state.navigation.year].drivers : [],
  driverInfo: state.data.seasonsDrivers,
  driverHistory: state.driverHistory || [],
  driverId: state.navigation.driverId,
  loadedCompareDriver: state.loadedCompareDriver,
  pageLoader: state.pageLoader,
});
export default connect(mapStateToProps)(DriverHistory);
