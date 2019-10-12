import React, { useState } from 'react';
import { SegmentedControl, WingBlank } from 'antd-mobile';
import Results from './Results';
import Qualify from './Qualify';
import Timmings from './Timmings';

const Race = () => {
  const [segmentSelected, loadSegment] = useState(0);
  const onChange = (e) => loadSegment(e.nativeEvent.selectedSegmentIndex);

  return (
    <div>
      <WingBlank className="sticky-segment">
        <SegmentedControl
          selectedIndex={segmentSelected}
          values={['Results', 'Qualify', 'Timming', 'PitStops', 'Track']}
          onChange={onChange}
        />
      </WingBlank>
      {segmentSelected === 0 && <Results />}
      {segmentSelected === 1 && <Qualify/>}
      {segmentSelected === 2 && <Timmings/>}
    </div>
  );
};

export default Race;
