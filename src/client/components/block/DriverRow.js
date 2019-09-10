import React, { Component } from 'react';
import { connect } from 'react-redux';
import wtf from 'wtf_wikipedia'
import { WikiData } from '../../actions/helper'
import ModalDriver from '../Modal'


export class DriverRow extends Component {
  state = {
    open: false,
  }
  loadDriverData = () => {
    wtf.fetch('Lewis Hamilton', 'pl', (err, doc)=> {
      this.setState({text: doc.json(), open: true})
    })
  }
  closeModal = () => {
    this.setState( { open: false })
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
      {this.state.open && <ModalDriver close={this.closeModal} open={this.state.open} data={<WikiData data={this.state.text}/>}/>}
    </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack,
  seasonsDrivers: state.data.seasonsDrivers
});
export default connect(mapStateToProps)(DriverRow);

