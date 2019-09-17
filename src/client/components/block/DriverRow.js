import React, { Component } from 'react';
import { connect } from 'react-redux';

export class DriverRow extends Component {
  state = {
    open: false,
  }

  render() {
    const { seasonsDrivers, driver } = this.props
    return (
      <div className="driver-box">
        <span className="info">
          {seasonsDrivers[driver].Driver.givenName} {seasonsDrivers[driver].Driver.familyName}
          <small><i> ({seasonsDrivers[driver].number || seasonsDrivers[driver].Driver.permanentNumber})
            <small> {seasonsDrivers[driver].Driver.code}</small></i></small>
        </span>
        <span className="constructor-box">{seasonsDrivers[driver].Constructors[0].name}</span>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack,
  seasonsDrivers: state.data.seasonsDrivers
});
export default connect(mapStateToProps)(DriverRow);

