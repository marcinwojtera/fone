import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundry';
import Header from './components/Header';
import { fetchSeasons, fetchData } from './actions';
import './app.scss';

class App extends Component {
  componentDidMount() {
    this.listenUrlChanges();
    this.props.dispatch(fetchData(this.props.history.location.pathname));
    this.props.dispatch(fetchSeasons());
    

  }

  listenUrlChanges = () => {
    this.props.history.listen(location => {
      this.props.dispatch(fetchData(location.pathname))
    });
  }

  render() {
    const { route, loader } = this.props;
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
  loader: state.settings.loader
});
export default {
  component: connect(mapStateToProps)(App)
};
