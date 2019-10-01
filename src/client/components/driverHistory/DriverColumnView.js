import React from 'react'
import { Segment } from 'semantic-ui-react'
import {connect} from "react-redux";
import { groupBy, map } from 'lodash';
import './DriverColumnView.scss';


class DriverChart extends React.Component {

  render () {
    const tableDriver = groupBy(this.props.data, 'driverId', 'year');
    return (
      <Segment vertical >
       <div style={{width: '100%', overflow: 'auto'}} className='driver-compare-table'>
         <div  style={{display: 'inline-flex'}}>
           {map(tableDriver, (year, driver) => {
             return (
               <div className='compare-column' key={driver}>
                 <div className='driver-points'>
                   {this.props.seasonsDrivers[driver].Driver.givenName}
                   {this.props.seasonsDrivers[driver].Driver.familyName}
                 </div>
                 <div className='driver-year-group' style={{display: 'inline-flex'}}>
                   {map(year, (data) => {
                     return (<div className='driver-year'>{data.year}

                       <div className='season-points'>{map(data.data, pkt => {
                         return (<div className='pkt'>{pkt.y}</div>)
                       })}</div>

                     </div>)
                   })}
                 </div>
               </div>
             )
           })}
         </div>
       </div>
      </Segment>
    )
  }
}


const mapStateToProps = state => ({
  loadedCompareDriver: state.loadedCompareDriver,
  seasonsDrivers: state.data.seasonsDrivers,
});
export default connect(mapStateToProps)(DriverChart);
