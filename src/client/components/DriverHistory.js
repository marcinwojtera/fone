import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, filter, forEach, pick } from 'lodash'
import { Grid, Header, Label, Menu, Segment, Table, Icon, Portal, Button } from 'semantic-ui-react'
import Statistics from './driverHistory/Statistics'
import RetiresInfo from './driverHistory/RetiresInfo'
import DriverChart from './driverHistory/DriverChart'
import HeaderDriverHistory from './driverHistory/HeaderDriverHistory'
import DriverColumnView from './driverHistory/DriverColumnView'
import { calculateChart } from './../actions/helper'
import DriverList from './driverHistory/DriverList'

class DriverHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.year,
      open: false,
      chartSelectedYears: [props.year],
      columnView: false,
    };
  }

  componentDidUpdate (prevProps) {
    if (this.props.driver !== prevProps.driver) {
      this.setState({activeItem: this.props.year, chartSelectedYears: [this.props.year]})
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  statistics = () => {
    let won = 0;
    let second = 0;
    let third = 0;
    let pole = 0
    let ret = 0;
    let status = {};

    const test = map(this.props.driverHistory, year => {
      return map(year,season => {
        if(season.data.grid == 1) {
            pole = pole +1
        }
        if(season.data.position == 1) {
          won = won +1
        }
        if(season.data.position == 2) {
          second = second +1
        }
        if(season.data.position == 3) {
          third = third +1
        }
        if(season.data.position == 3) {
          third = third +1
        }
        if(season.data.positionText == "R") {
          ret = ret +1;

          if(status[season.data.status]) {
            status[season.data.status] = status[season.data.status] + 1
          } else {
            status[season.data.status] = 1
          }

        }
      })
    })
    return {won, second, third, pole, ret, status}
  }

  openBigChart = () => {
    this.setState({ open: true })
  }

  closeBigChart = () => {
    this.setState({ open: false })
  }

  selectChartYear = (year) => {
    let selectedYears = this.state.chartSelectedYears;
    const filterExist = selectedYears.indexOf(year) >= 0

    if (filterExist) {
      selectedYears = filter(this.state.chartSelectedYears, (n => n !== year));
    } else {
      selectedYears.push(year);
    }

    this.setState({ chartSelectedYears: selectedYears })
  }
  calculateDataChart = () => {
    return calculateChart(this.props.driverHistory, this.props.loadedCompareDriver, this.state.chartSelectedYears, this.props.driver)
  }
  columnViewToggle = () => {
    this.setState({columnView: !this.state.columnView})
  }

  render() {
  const { activeItem } = this.state;
  const stats = this.statistics()
  const seasons = this.props.driverHistory[this.state.activeItem] || [];

    return (
      <div key={this.props.driverId}>
        {this.state.open && <div className='dimmer' />}

          <HeaderDriverHistory />
          <Segment>


          <Grid celled='internally' padded='vertically'>
            <Grid.Row>
              <Grid.Column width={3} >

                <DriverList />
              </Grid.Column>
              <Grid.Column width={13} style={{background: '#fafafb'}}>


                <small>
                  <strong>YEAR: {' '}</strong>

                  {map(this.props.driverHistory, (data, year)=> data && (
                    <Button
                      color={this.state.chartSelectedYears.indexOf(year) >= 0 ? 'purple': null}
                      size={'mini'}
                      name={year}
                      key={year}
                      disabled={!data}
                      style={{padding: '5px 8px'}}
                      onClick={()=> this.selectChartYear(year)}
                    >{year}</Button>
                  ))
                  }

                  <Label style={{ float: 'right', cursor: 'pointer', padding: '5px 8px'}} onClick={this.columnViewToggle}>
                    {this.state.columnView ? <span><Icon name={'zoom-in'} /> Chart view</span> :
                     <span> <Icon name={'zoom-in'} /> Column view</span>}
                  </Label>
                  <br/>


                  {this.state.chartSelectedYears.length > 0 ?
                    <span>
                        {this.state.columnView ?
                          <DriverColumnView data={this.calculateDataChart()} /> :
                          <DriverChart
                            key={this.state.chartSelectedYears}
                            height={390}
                            data={this.calculateDataChart()}
                          />
                        }
                    </span> :  <Segment placeholder>
                      <Header icon>
                        <Icon name='info' />
                        Please select at least one year.
                      </Header>
                    </Segment>
                  }

                </small>


                <Statistics stats={stats}/>

                <br/>

                <RetiresInfo stats={stats}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Menu pointing secondary>
            {map(this.props.driverHistory, (data, year)=> (
              <Menu.Item
                name={year}
                key={year}
                disabled={!data}
                active={activeItem === year}
                onClick={this.handleItemClick}
              />
            ))
            }
          </Menu>

          <Table definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{width: 200}}/>
                <Table.HeaderCell style={{width:60}}>Place</Table.HeaderCell>
                <Table.HeaderCell style={{width:60}}>Points</Table.HeaderCell>
                <Table.HeaderCell>Grid</Table.HeaderCell>
                <Table.HeaderCell>Fastest lap</Table.HeaderCell>
                <Table.HeaderCell>Av speed</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {seasons.map(x=> {
                  return (
                    <Table.Row key={x.circuit.raceName} error={x.data.positionText == 'R'}>
                      <Table.Cell>{x.circuit.raceName}</Table.Cell>
                      <Table.Cell>
                        {x.data.positionText == 'R' ? <Label ribbon color={'red'}>R</Label> :
                          <span>
                            <b>{x.data.position}</b>
                          </span>}
                      </Table.Cell>
                      <Table.Cell>{x.data.points !== '0' ? <span>+{x.data.points}</span> : <span>0</span>}</Table.Cell>
                      <Table.Cell>{x.data.grid}</Table.Cell>
                      <Table.Cell>

                        {x.data.FastestLap && <span className="driver-box">
                        {x.data.FastestLap.Time.time}
                          <span className="lap-place-box">Lap: {x.data.FastestLap.lap}, Time rank: {x.data.FastestLap.rank}</span>
                      </span>}

                      </Table.Cell>
                      <Table.Cell>{x.data.FastestLap && <span>{x.data.FastestLap.AverageSpeed.speed} <small>km/h</small></span>}</Table.Cell>
                      <Table.Cell>{x.data.status}</Table.Cell>
                    </Table.Row>
                  )
                })
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
  driverInfo: state.data.seasonsDrivers,
  driverHistory: state.driverHistory,
  driver: state.navigation.driver,
  seasonsDrivers: state.data.seasonsDrivers[state.navigation.driver] || [],
  loadedCompareDriver: state.loadedCompareDriver,
});
export default connect(mapStateToProps)(DriverHistory);



{/*<Portal onClose={this.closeBigChart} open={this.state.open}>*/}
  {/*<Segment*/}
    {/*style={{*/}
      {/*left: '5%',*/}
      {/*position: 'fixed',*/}
      {/*top: '10%',*/}
      {/*width: '90%',*/}
      {/*zIndex: '1000',*/}
    {/*}}*/}
  {/*>*/}
    {/*<Grid >*/}
      {/*<Grid.Row>*/}
        {/*<Grid.Column width={16} >*/}
          {/*<HeaderDriverHistory simple/>*/}
        {/*</Grid.Column>*/}
      {/*</Grid.Row>*/}
    {/*</Grid>*/}

    {/*<DriverChart driverHistory={this.props.driverHistory} height={450}/>*/}
    {/*<br/>*/}
    {/*<Button*/}
      {/*size='mini'*/}
      {/*content='Close'*/}
      {/*onClick={this.closeBigChart}*/}
    {/*/>*/}
  {/*</Segment>*/}
{/*</Portal>*/}