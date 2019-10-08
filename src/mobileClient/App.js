import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Card, WhiteSpace, Badge, Tabs } from 'antd-mobile';
import { Route, Switch, withRouter } from 'react-router-dom';
import { maps } from '../client/actions/helper';
import { fetchTrackMedia } from '../client/actions';
import Menu from './menu/Menu';
import Home from './home/Home';
import Race from './race/Race';
import './app.scss';

const App = () => {
  const seasonsList = useSelector(state => state.data.seasonsList);
  const isHomeView = useSelector(state => state.navigation.pageView === 'home');
  const trackImg = useSelector(state => state.loadedTrackHome);
  const dispatch = useDispatch();

  const [nextTrack, onLoadTrack] = useState(false);

  const showNextRace = () => {
    const dateNow = new Date();
    const circInfo = seasonsList.find(x => +dateNow <= +new Date(x.date));
    if (circInfo) {
      onLoadTrack(circInfo);
      dispatch(fetchTrackMedia(circInfo.round));
    }
  };

  useEffect(() => {
    // showNextRace();
  }, []);

  return (
    <div>
      <div className="heads">
        sss
      </div>
      <Menu />

      <div className="next-race">

        <WhiteSpace />
        <Switch>
          <Route exact path="/" component={Home} />
          {/*<Route path="/driver/:driverId" component={Driver} />*/}
          <Route path="/race/:year/:season" component={Race} />
        </Switch>


        <WhiteSpace />


        <div />

      </div>
    </div>

  );
};


export default withRouter(App);


//
// {isHomeView
// && (
//   <Card full>
//     <Card.Header
//       title="NEXT RACE:"
//       extra={<span>{nextTrack.date}</span>}
//     />
//     <Card.Body>
//       <div>
//         {trackImg && <img src={trackImg.original.source} style={{ width: '100%' }} />}
//       </div>
//     </Card.Body>
//     <Card.Footer content={nextTrack && nextTrack.Circuit.circuitName} extra={<div>{nextTrack.raceName}</div>} />
//   </Card>
// )
// }
