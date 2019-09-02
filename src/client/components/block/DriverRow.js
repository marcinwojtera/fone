import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'semantic-ui-react';
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
    const { driversList, driver } = this.props
    return (
      <div className="driver-box">
        <span className="info">
          {driversList[driver].Driver.givenName} {driversList[driver].Driver.familyName}
          <small><i> ({driversList[driver].number || driversList[driver].Driver.permanentNumber})
            <small> {driversList[driver].Driver.code}</small></i></small>
        </span>
        <span className="constructor-box">{driversList[driver].Constructors[0].name}</span>
      {this.state.open && <ModalDriver close={this.closeModal} open={this.state.open} data={<WikiData data={this.state.text}/>}/>}
    </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack,
  driversList: state.data.driversList
});
export default connect(mapStateToProps)(DriverRow);

