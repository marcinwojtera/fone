import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SegmentedControl, WingBlank } from 'antd-mobile';
import Results from './Results';

const Race = () => {
  const seasonsList = useSelector(state => state.data.seasonsList);

  const dispatch = useDispatch();

  const [segmentSelected, loadSegment] = useState(0);

  const onChange = (e) => {
    loadSegment(e.nativeEvent.selectedSegmentIndex);
  };

  return (
    <div>
      <WingBlank>
        <SegmentedControl
          selectedIndex={segmentSelected}
          values={['Results', 'Qualify', 'Timming', 'Track' ]}
          onChange={onChange}
        />
      </WingBlank>

      {segmentSelected === 0 && <Results />}
    </div>
  );
};

export default Race;
