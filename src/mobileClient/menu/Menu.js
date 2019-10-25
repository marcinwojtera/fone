import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Picker, List, Tabs } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { fetchData } from '../../client/actions';

const Menu = ({ history }) => {
  const selectedTrack = useSelector(state => state.selectedTrack);
  const year = useSelector(state => state.navigation.year);
  const season = useSelector(state => state.navigation.season);
  const seasonsYears = useSelector(state => state.data.seasonsYears);
  const seasonsList = useSelector(state => state.data.seasonsList);

  const dispatch = useDispatch();

  const [yearSelected, onChangeYear] = useState(year);
  const [trackSelected, onChangeTrack] = useState(season);

  const loadData = () => {
    const url = `/race/${yearSelected}/${trackSelected}`;
    history.push(url);
    dispatch(fetchData(url));
  };

  useEffect(() => {
    if (yearSelected !== year || trackSelected !== season) loadData();
  }, [trackSelected, yearSelected]);

  const tracks = [seasonsList.map(x => ({ label: x.raceName, value: x.round }))];
  const tabs = seasonsYears.map(year => ({ title: year, key: year }));
  const track = seasonsYears.map(x => ({ title: x.raceName, key: x.round }));

  return (
    <div className="track-picker">

      <Tabs
        tabs={tabs}
        initialPage={year}
        onTabClick={(year) => onChangeYear(year.title)}
      />

      <Tabs
        tabs={track}
        initialPage={selectedTrack.round}
        onTabClick={(track) => onChangeTrack(track.key)}
      />

      <Picker
        data={tracks}
        okText="Ok"
        dismissText="Cancel"
        cascade={false}
        extra={selectedTrack.raceName}
        cols={1}
        onOk={(track) => onChangeTrack(track)}
      >
        <List.Item arrow="horizontal">Track</List.Item>
      </Picker>
    </div>

  );
};

export default withRouter(Menu);
