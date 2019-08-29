import React, { Component } from 'react';
import { connect } from 'react-redux';
import DriversPoints from '../components/DriversPoints';
import UrlWrapper from './urlWrapper';
import {withRouter} from "react-router-dom";

class Race extends Component {

  render() {
    return (
      <div>
        <DriversPoints />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsResults: state.data.seasonsResults,
});

export default withRouter(UrlWrapper(connect(mapStateToProps)(Race)));
