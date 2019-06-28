import React, { Component } from 'react';
import { fetchData } from '../actions';
import { connect } from 'react-redux';

class HomePage extends Component {
  render() {
    const { route, loader } = this.props;
    return (
      <div>
        ddd {loader && <div>asdasdasdada</div>}
        <div className="container">
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  navigation: state.navigation,
  loader: state.settings.loader
});
export default {
  component: connect(mapStateToProps)(HomePage)
};
