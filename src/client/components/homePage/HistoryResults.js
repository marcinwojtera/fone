import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Table, Label, Icon} from 'semantic-ui-react';
import PerfectScrollbar from 'react-perfect-scrollbar'

class HistoryResults extends Component {
  state = {
    rendered: false,
  }

  render() {
    return (
      <div style={{height: '100%'}}>
              <Table style={{ marginBottom: '-2px'}}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell style={{width:40}}>&nbsp;</Table.HeaderCell>
                    <Table.HeaderCell>Driver</Table.HeaderCell>
                    <Table.HeaderCell style={{width:30}}>Grid</Table.HeaderCell>
                    <Table.HeaderCell style={{width:90}}>Fastest lap</Table.HeaderCell>
                    <Table.HeaderCell style={{width:120}}>Av speed</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              </Table>
         <div className='table-slide' style={{height: 'calc(100% - 60px)'}}>
           <PerfectScrollbar>
           <Table style={{ margin: 0}} >
             <Table.Body>
               {this.props.seasonsResults.map(x => (
                 <Table.Row key={x.number+'-' +this.props.season} error={x.positionText == 'R'}>
                   <Table.Cell style={{width:10}}>
                     <b>{x.position}</b>
                   </Table.Cell>
                   <Table.Cell> {x.Driver.driverId }</Table.Cell>
                   <Table.Cell style={{width:30}}>{x.grid}</Table.Cell>
                   <Table.Cell style={{width:90}}>{x.FastestLap && <span className="driver-box">
                        {x.FastestLap.Time.time}
                      </span>}

                   </Table.Cell>
                   <Table.Cell  style={{width:120}}>{x.FastestLap && <span>{x.FastestLap.AverageSpeed.speed} <small>km/h</small></span>}</Table.Cell>
                 </Table.Row>
               ))}
             </Table.Body>
           </Table>
           </PerfectScrollbar>
         </div>

              <div>
              </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsResults: state.historyTrack ? state.historyTrack.Results : [],
  season: state.navigation.season,
});
export default connect(mapStateToProps)(HistoryResults);
