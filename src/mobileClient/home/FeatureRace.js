import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd-mobile';
import { fetchTrackMedia } from '../../client/actions';

const FeatureRace = () => {
  const seasonsList = useSelector(state => state.data.seasonsList);
  const trackImg = useSelector(state => state.loadedTrackHome);
  const year = useSelector(state => state.navigation.year);
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
    showNextRace();
  }, [year]);

  return (
    <div>
      <Card full>
        <Card.Header
          title="NEXT RACE:"
          extra={<span>{nextTrack.date}</span>}
        />
        <Card.Body>
          <div>
            {trackImg && <img src={trackImg.original.source} style={{ width: '100%' }}/>}
          </div>
        </Card.Body>
        <Card.Footer content={nextTrack && nextTrack.Circuit.circuitName} extra={<div>{nextTrack.raceName}</div>}/>
      </Card>
    </div>

  );
};


export default FeatureRace;
