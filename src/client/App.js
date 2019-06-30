import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundry';
import Header from './components/Header';
import { fetchData } from './actions';
import './app.scss';

class App extends Component {
  componentDidMount() {
    this.listenUrlChanges();
  }

  listenUrlChanges = () => {
    this.props.history.listen(location => {
      const season = location.pathname.split('/');
      const year = location.pathname.split('/');
      this.props.dispatch(fetchData(year[1], season[2]));
    });
  }

  render() {
    const { route } = this.props;
    return (
      <div>
        <Header />
        <div className="container">
          <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any)
};

App.defaultProps = {
  route: null
};

const mapStateToProps = state => ({
  navigation: state.navigation,
});
export default {
  component: connect(mapStateToProps)(App)
};
