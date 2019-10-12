import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundry';
import MenuComponent from './components/Menu';
import HomePage from './pages/HomePage';
import Race from './pages/Race';
import Driver from './pages/Driver';
import './app.scss';
import { Segment, Dimmer } from 'semantic-ui-react';

const App = () => (
  <div className="app-container">
    <MenuComponent />
    <Dimmer.Dimmable as={Segment} dimmed style={{ margin: 0, height: 'calc(100% - 65px)' }}>
      <ErrorBoundary>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/driver/:driverId" component={Driver} />
          <Route path="/race/:year/:season" component={Race} />
        </Switch>
      </ErrorBoundary>
    </Dimmer.Dimmable>
  </div>
);

export default withRouter(App);
