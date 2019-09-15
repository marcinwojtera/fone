import React, { Component } from 'react';
import { connect } from 'react-redux';
import DriverPointBlock from "./block/DriverPointBlock";
import ConstructorsPointBlock from './block/ConstructorsPointBlock'
import { Tab } from 'semantic-ui-react'

const panesMap = [
  { menuItem: { key: 'Driver points', icon: 'area graph', content: 'Driver points' }, render: () => <Tab.Pane> <DriverPointBlock /></Tab.Pane> },
  { menuItem: { key: 'Constructors points', icon: 'area graph', content: 'Constructors points' }, render: () => <Tab.Pane> <ConstructorsPointBlock /></Tab.Pane> },
]
class LeftPanel extends Component {
  state = {
    active: false,
    text: '',
    text2:''
  }

  render() {
    return (
      <div>
        <Tab panes={panesMap} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrack: state.selectedTrack,
});
export default connect(mapStateToProps)(LeftPanel);
