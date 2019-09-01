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
    const { driver } = this.props
    return (
      <div onClick={this.loadDriverData}>
        {driver.Driver.givenName} {driver.Driver.familyName} <small><i> ({driver.number || driver.Driver.permanentNumber}) </i></small>
        {this.state.open && <ModalDriver close={this.closeModal} open={this.state.open} data={<WikiData data={this.state.text}/>}/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack
});
export default connect(mapStateToProps)(DriverRow);
