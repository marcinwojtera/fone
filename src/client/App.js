import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundry';
import MenuComponent from './components/Menu';
import HomePage from './pages/HomePage';
import Race from './pages/Race';
import Driver from './pages/Driver';

import './app.scss';

class App extends Component {

  render() {
    return (
      <div className="app-container">
          <div style={{height: '100%'}}>
            <MenuComponent />
            <ErrorBoundary>
              <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/driver/:driverId"  component={Driver} />
              <Route path="/race/:year/:season"  component={Race} />
              </Switch>
            </ErrorBoundary>
          </div>
      </div>
    );
  }
}

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any),
};

App.defaultProps = {
  route: null,
};

const mapStateToProps = state => ({
  navigation: state.navigation,
});

export default withRouter(connect(mapStateToProps)(App));
