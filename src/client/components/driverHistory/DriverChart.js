import React from 'react';
import { Segment } from 'semantic-ui-react';
import { ResponsiveLine } from '@nivo/line';
import ChartToolTip from './ChartToolTip';

const DriverChart = ({ selected, height, data, mobile }) => {
  const selectedChart = selected && selected.length !== 0;
  return (
    <Segment vertical>
      <div style={{ width: '100%', height: height }}>
        <ResponsiveLine
          data={data}
          enableSlices="x"
          margin={{ top: 10, right: 5, bottom: 50, left: !mobile ? 40 : 5 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', stacked: false, min: 0, max: 'auto' }}
          sliceTooltip={({ slice }) => !mobile && <ChartToolTip slice={slice} />}
          axisTop={null}
          axisRight={null}
          enablePointLabel={mobile}
          isInteractive={!mobile}
          pointLabel="y"
          pointLabelYOffset={2}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Race',
            legendOffset: 40,
            legendPosition: 'middle',
          }}
          axisLeft={ !mobile ? {
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Position',
            legendOffset: 30,
            legendPosition: 'middle',
          }: null}
          colors={{ scheme: 'dark2' }}
          lineWidth={1}
          pointSize={3}
          pointColor={{ theme: 'grid.line.stroke' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor', modifiers: [] }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh
          legends={!selectedChart ? [
            {
              anchor: 'bottom-left',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 60,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 74,
              itemHeight: 10,
              itemOpacity: 0.75,
              symbolSize: 8,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ] : []}
        />
      </div>
    </Segment>
  );
};

export default DriverChart;
