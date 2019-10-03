import React from 'react';
import { Label } from 'semantic-ui-react';
import { filter } from 'lodash';
import { connect } from 'react-redux';

const ChartToolTip = ({ slice, driverHistory }) => (
  <div
    style={{
      background: 'white',
      padding: '9px 12px',
      width: '300px',
      border: '1px solid #ccc',
    }}
  >
    <div>
      Round: {slice.points[0].data.xFormatted}
    </div>
    {slice.points.map(point => {
      const track = filter(driverHistory[point.serieId], { season: slice.points[0].data.xFormatted })[0];
      return (
        <div
          key={point.id}
          style={{
            padding: '3px 0',
          }}
        >
          <div>
            <small>Pos:</small>
            <Label style={{ background: point.serieColor, width: 35, textAlign: 'center', color: '#fff' }}>
              {point.data.yFormatted}
            </Label>
            <Label>
              {point.serieId}
            </Label>
            <small>
              {track ? track.circuit.raceName : <span />}
            </small>
          </div>
        </div>
      );
    })}
  </div>
);

const mapStateToProps = state => ({
  driverHistory: state.driverHistory,
});
export default connect(mapStateToProps)(ChartToolTip);
