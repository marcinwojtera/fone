import React, { Component } from 'react';
import { connect } from 'react-redux';
import DriversPoints from '../components/DriversPoints';
import {withRouter} from "react-router-dom";
import UrlWrapper from '../urlWrapper'

class Race extends Component {

  render() {
    return (
      <div>
        {this.props.seasonsResults && <DriversPoints />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsResults: state.data.seasonsResults,
});
export default withRouter(UrlWrapper(connect(mapStateToProps)(Race)));

