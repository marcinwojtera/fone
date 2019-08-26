import React, { Component } from 'react';
import { connect } from 'react-redux';
import DriversPoints from '../components/DriversPoints';

class Race extends Component {
  
  render() {
    return (
      <div>
        <DriversPoints />
</div>
    );
  }
}
//

const mapStateToProps = state => ({
  seasonsDrivers: state.data.seasonsDrivers,
});
export default {
  component: connect(mapStateToProps)(Race),
};


{ /*
 */ }
