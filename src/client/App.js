import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundry';
import Header from './components/Header';
import MenuComponent from './components/Menu';
import HomePage from './pages/HomePage';
import Race from './pages/Race';
import './app.scss';


class App extends Component {

  render() {
    return (
      <div className="app-container">

          <div>
            <MenuComponent />
            <Header />
            <ErrorBoundary>
              <Route exact path="/" component={HomePage} />
              <Route path="/race/:year/:season/:tab?"  component={Race} />
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
// export default connect(mapStateToProps)(UrlWrapper(Race))

export default withRouter(connect(mapStateToProps)(App));
