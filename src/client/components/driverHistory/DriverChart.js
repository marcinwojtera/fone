import React from 'react'
import { Segment } from 'semantic-ui-react'
import { ResponsiveLine } from '@nivo/line'
import { map, forEach, filter, pick } from 'lodash';
import ChartToolTip from './ChartToolTip'

class DriverChart extends React.Component {

  render () {
    const selectedChart = this.props.selected && this.props.selected.length !== 0
    return (
      <Segment vertical >
        <div style={{width: '100%', height: this.props.height}}>
          <ResponsiveLine
            data={this.props.data}
            enableSlices="x"
            margin={{ top: 10, right: 5, bottom: 50, left: 40 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', stacked: false, min: 0, max: 'auto' }}
            sliceTooltip={({ slice }) => <ChartToolTip slice={slice}/>}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Race',
              legendOffset: 40,
              legendPosition: 'middle'
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Position',
              legendOffset: -30,
              legendPosition: 'middle'
            }}
            colors={{ scheme: 'dark2' }}
            lineWidth={1}
            pointSize={3}
            pointColor={{ theme: 'grid.line.stroke' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor', modifiers: [] }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
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
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]: []}
          />
        </div>
      </Segment>
    )
  }
}

export default DriverChart;
