import React, { Component } from 'react';
import { connect } from 'react-redux';

export class DriverRow extends Component {
  state = {
    open: false,
  }

  render() {
    const { seasonsDrivers, driver, homeView } = this.props;
    const driverData = homeView ? this.props.driverData : seasonsDrivers[driver].Driver;
    const constructorData = homeView ? this.props.constructorData : seasonsDrivers[driver].Constructors[0]

    return (
      <div className="driver-box">
        <span className="info">
          {driverData.givenName} {driverData.familyName}
          <small><i> ({driverData.number || driverData.permanentNumber})
            <small> {driverData.code}</small></i></small>
        </span>
        <span className="constructor-box">{constructorData.name}</span>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack,
  seasonsDrivers: state.data.seasonsDrivers
});
export default connect(mapStateToProps)(DriverRow);

