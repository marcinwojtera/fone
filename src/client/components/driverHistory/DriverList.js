import React, { Component } from 'react'
import { List, Label } from 'semantic-ui-react'
import { map } from 'lodash'
import { connect } from 'react-redux';
import { fetchDriverToCompare } from './../../actions'

class DriverList extends Component {


  fetch = (driverId) =>{
    this.props.dispatch(fetchDriverToCompare(driverId))
  }

  render() {
    return (
      <div>
        <small> <strong>COMPARE WITH: {' '}</strong>
  <br/>  <br/>


          {map(this.props.seasonsDrivers, (driver, indexId) => this.props.driverId !== indexId && (

            <Label
              className="driver-list-history"
              as={'a'}
              key={indexId}
              onClick={() => this.fetch(indexId)}
              color={!!this.props.loadedCompareDriver[indexId] ? 'purple' : null} >
              {driver.Driver.givenName} {driver.Driver.familyName}
            </Label>

          ))}
       </small>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  seasonsDrivers: state.data.seasonsDrivers,
  loadedCompareDriver: state.loadedCompareDriver,
  driverId: state.navigation.driver,
});
export default connect(mapStateToProps)(DriverList);