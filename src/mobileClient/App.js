import React, { useState, useEffect } from 'react';
import { WhiteSpace, NavBar } from 'antd-mobile';
import { Icon } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Menu from './menu/Menu';
import Home from './home/Home';
import Race from './race/Race';
import Driver from './driver/Driver';
import './app.scss';

const App = ({ history }) => {

  const goHistoryBack = () => history.push('');

  return (
    <div>
      <NavBar
        mode="dark"
        icon={<Icon name='home'/>}
        onLeftClick={() => goHistoryBack()}
      >Fi Stats</NavBar>
      <Menu />

      <div className="next-race">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/driver/:driverId/:year" component={Driver} />
          <Route path="/race/:year/:season" component={Race} />
        </Switch>
        <WhiteSpace />
        <div />
      </div>
    </div>

  );
};


export default withRouter(App);
