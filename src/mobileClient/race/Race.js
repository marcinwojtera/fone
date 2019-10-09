import React, { useState } from 'react';
import { SegmentedControl, WingBlank } from 'antd-mobile';
import Results from './Results';

const Race = () => {
  const [segmentSelected, loadSegment] = useState(0);
  const onChange = (e) => {
    loadSegment(e.nativeEvent.selectedSegmentIndex);
  };

  return (
    <div>
      <WingBlank className="sticky-segment">
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
