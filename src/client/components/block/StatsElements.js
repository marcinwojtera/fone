import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ResponsiveBump } from '@nivo/bump'
import map from 'lodash/map'

class StatsElements extends Component {
  state = {
    rendered: false,
  }

  render() {
    const datam = map(this.props.seasonQualify, (z, d) => {
      const datas = this.props.stats.map((x, i=i+1) => {

        if (i > 0 && x[z.Driver.driverId]) {
          return  {x:i+1+"Lap" , y: x[z.Driver.driverId]['position']}
        } else return  {x:i+1+"Lap", y: d+1}
      })
      return {id: z.Driver.driverId, data: datas}

    })
    return (
      <div style={{ height: '500px', overflowX: 'scroll'}}>
        <ResponsiveBump
          data={datam}
          margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
          xPadding={0.3}
          xOuterPadding={0}
          height={450}
          width={2450}
          colors={{ scheme: 'red_grey' }}
          lineWidth={2}
          activeLineWidth={3}
          inactiveLineWidth={3}
          opacity={0.8}
          inactiveOpacity={0.2}
          pointSize={2}
          activePointSize={9}
          inactivePointSize={1}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={1}
          activePointBorderWidth={1}
          pointBorderColor={{ from: 'serie.color', modifiers: [] }}
          enableGridX={false}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 1,
            tickPadding: 5,
            tickRotation: 90,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 20,
            tickPadding: 10,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -60
          }}
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.data.statsBySeason ? state.data.statsBySeason.test : [],
  seasonQualify: state.data.seasonQualify.QualifyingResults,
  season: state.navigation.season,
});
export default connect(mapStateToProps)(StatsElements);
