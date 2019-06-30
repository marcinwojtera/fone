import React, { Component } from 'react';
import { fetchData } from '../actions';
import { connect } from 'react-redux';

class HomePage extends Component {
  render() {
    const { route } = this.props;
    return (
      <div>
        ddd 
        <div className="container">
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  navigation: state.navigation,
});
export default {
  component: connect(mapStateToProps)(HomePage)
};
