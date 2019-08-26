import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundry';
import Header from './components/Header';
import Menu from './components/Menu';
import { fetchData } from './actions';
import './app.scss';

class App extends Component {
  componentDidMount() {
    this.listenUrlChanges();
  }

  listenUrlChanges = () => {
    this.props.history.listen(location => {
      const season = location.pathname.split('/')[2];
      const year = location.pathname.split('/')[1];
      this.props.dispatch(fetchData(year, season));
    });
  }

  render() {
    const { route } = this.props;
    return (
      <div>
        <Header />
        <div className="container">
          <Menu />
          <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
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
export default {
  component: connect(mapStateToProps)(App),
};
