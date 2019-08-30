import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import {data} from './data'
import {connect} from "react-redux";

export class MyResponsiveLine extends Component {
  render() {

  return (

  <div style={{height:600}}>
    <ResponsiveLine
      enableSlices="x"
    data={this.props.pointStats}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Season',
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    colors={{ scheme: 'set1' }}
    lineWidth={1}
    enablePoints={false}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
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
    ]}
    sliceTooltip={({ slice }) => {
      return (
        <div
          style={{
            background: 'white',
            padding: '9px 12px',
            border: '1px solid #ccc',
          }}
        >
          {slice.points.map(point => (
            <div
              key={point.id}
              style={{
                color: '#999',
                padding: '3px 0',
              }}
            >
              <strong>{point.serieId}</strong> [{point.data.yFormatted}]
            </div>
          ))}
        </div>
      );
    }}
  />
  </div>
  );
  }
}

const createStatsData = state => {
  const list = []
  Object.keys(state.data.driversList).map((key, index) => {
    const data = []
    state.data.seasonsDriversListPerYear.forEach((c, i)=> {
      const point = c.data.filter(filter => filter.Driver.driverId == key)
      data.push(point.map(v => ({x: c.season, y: point[0].points}))[0])
    })
    list.push({id: state.data.driversList[key].Driver.familyName, data })
  });

  return list
}

const mapStateToProps = state => ({
  driversList: state.data.driversList,
  seasonsDriversListPerYear: state.data.seasonsDriversListPerYear,
  pointStats: createStatsData(state)
});
export default connect(mapStateToProps)(MyResponsiveLine);
