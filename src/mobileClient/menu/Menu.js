import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Picker, List } from 'antd-mobile';
import { fetchData } from '../../client/actions';
import { withRouter } from 'react-router-dom';

const Menu = ({history}) => {
  const selectedTrack = useSelector(state => state.selectedTrack);
  const year = useSelector(state => state.navigation.year);
  const season = useSelector(state => state.navigation.season);
  const seasonsYears = useSelector(state => state.data.seasonsYears);
  const seasonsList = useSelector(state => state.data.seasonsList);

  const dispatch = useDispatch();

  const [yearSelected, onChangeYear] = useState(year);
  const [trackSelected, onChangeTrack] = useState(season);

  const loadData = () =>{
    const url = `/race/${yearSelected}/${trackSelected}`;
    history.push(url);
    dispatch(fetchData(url));
  }

  useEffect(() => {
    if(yearSelected !== year || trackSelected !== season) {
      loadData();
    }
  }, [trackSelected, yearSelected]);

  const seasons = [seasonsYears.map(x => ({ label: x, value: x }))];
  const tracks = [seasonsList.map(x => ({ label: x.raceName, value: x.round}))];

  return (
    <div className="track-picker">
      <Picker
        data={seasons}
        okText="Ok"
        dismissText="Cancel"
        cascade={false}
        extra={year}
        cols={1}
        onOk={(year) => onChangeYear(year)}
      >
        <List.Item arrow="horizontal">Year</List.Item>
      </Picker>
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
