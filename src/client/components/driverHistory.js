import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, forEach } from 'lodash'
import { Statistic, Header, Icon, Label, Menu, Segment, Table } from 'semantic-ui-react'


class DriverHistory extends Component {

  state = { activeItem: this.props.year }
  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.driver !== prevProps.driver) {
      this.setState({activeItem: this.props.year})
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
  render() {
  const { activeItem } = this.state;
const stats = this.statistics()
  const seasons = this.props.driverHistory[this.state.activeItem] || [];
    return (
      <div key={this.props.driverId}>

        <Segment>
          <Header as='h5'>
            <Icon name='male' />
            <Header.Content>
          <span>{this.props.seasonsDrivers.Driver.givenName}
            {this.props.seasonsDrivers.Driver.familyName}</span>
              <Header.Subheader>
                <span>Nr: {this.props.seasonsDrivers.Driver.permanentNumber} |
                  Code: {this.props.seasonsDrivers.Driver.code} |
                  Nationality: {this.props.seasonsDrivers.Driver.nationality} |
                  Date of birth: {this.props.seasonsDrivers.Driver.dateOfBirth}
                </span>

              </Header.Subheader>
            </Header.Content>
          </Header>


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

          <Segment vertical>
            <Statistic.Group size={'mini'} color='purple' widths={5}>
              <Statistic>
                <Statistic.Value>{stats.won}</Statistic.Value>
                <Statistic.Label>Won</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{stats.pole}</Statistic.Value>
                <Statistic.Label>Pole position</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{stats.second}</Statistic.Value>
                <Statistic.Label>Second</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{stats.third}</Statistic.Value>
                <Statistic.Label>Third</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{stats.ret}</Statistic.Value>
                <Statistic.Label>Retires</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
          <Segment vertical>
            <div><small>RETIRES</small>: {map(stats.status, (stat, num) => {
              return(<span><small key={num}>{num}: {stat}  |{' '}</small> </span>)
            })}</div>
          </Segment>

          <Table definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{width: 180}}/>
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

          {/*<Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={this.renderTabs()} />*/}

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
});
export default connect(mapStateToProps)(DriverHistory);





<Table striped color='purple' selectable>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell style={{width:60}}>Place</Table.HeaderCell>
      <Table.HeaderCell style={{width:60}}>Points</Table.HeaderCell>
      <Table.HeaderCell>Driver</Table.HeaderCell>
      <Table.HeaderCell>Grid</Table.HeaderCell>
      <Table.HeaderCell>Fastest lap</Table.HeaderCell>
      <Table.HeaderCell>Av speed</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row >
      <Table.Cell>
        jhkjh
      </Table.Cell>
      <Table.Cell>kmkm</Table.Cell>
      <Table.Cell>
        dfdtdftdft
      </Table.Cell>
      <Table.Cell>2323</Table.Cell>
      <Table.Cell>dfdfdfdf

      </Table.Cell>
      <Table.Cell><span>sdfsdf <small>km/h</small></span></Table.Cell>
      <Table.Cell>dddd</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>