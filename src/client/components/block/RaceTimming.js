import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { Helmet } from "react-helmet";
import map  from 'lodash/map';

class RaceTimming extends Component {
  state = {
    rendered: false,
    selected: []
  }

  render() {
    const driversListToShow = ['leclerc','hamilton']
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>F1 statistics - {`${this.props.selectedTrack.raceName} Year: ${this.props.selectedTrack.season}`}</title>
          <meta name="description" content={`${this.props.selectedTrack.raceName} Year - ${this.props.selectedTrack.season} Race timming`} />
        </Helmet>
        <div style={{overflow: 'hidden'}}>
          </div>

        <div className="race-timming">
          <div className="race-timming-sticky">
            <div className="race-driver"><Icon naame="user circle"/></div>
            {map(this.props.seasonQualify, z => {
              return (<div className="race-driver" key={z.Driver.code}>{z.Driver.code}</div>)
            })}
          </div>

        <div className="race-timming-slide">

          <div className="timming-row" >
           {this.props.stats.map((x, i) =>  <span className="race-time-box" key={i+1}><small>Lap {i+1}</small></span>)}
          </div>

            {map(this.props.seasonQualify, (z, d) => {
              //
              return (

                <div className="timming-row" key={`${z.Driver.driverId}-${d}`}>
                  {this.props.stats.map((x, i) => {
                    let gap = '';
                    let gapBlock = ''
                    if (i > 0 && x[z.Driver.driverId]) {
                      const lastLap = this.props.stats[i-1][z.Driver.driverId]['position'];
                      const ccurrentLap = x[z.Driver.driverId]['position']
                      gap = lastLap - ccurrentLap;
                      gapBlock = gap !== 0 && (<span className="gap" key={ccurrentLap-x[z.Driver.driverId]}>
                          <span className={gap > 0 ? "plus" : "minus"}>{gap > 0 ? <span> {gap}</span> : <span> {gap}</span>}
                            {gap > 0 ? <Icon name={gap > 1 ? "angle double up" :"angle up"}/> :
                              <Icon name={gap < 1 ? "angle double down" :"angle down"}/>}

                          </span>{gap > 0 ? <div className="green-box" /> : <div className="red-box"/> }
                      </span>)
                    }

                    return (
                      <span className="race-time-box" key={`${z.Driver.driverId}-${i}`}>
                        {x[z.Driver.driverId]  ?  <span>{ x[z.Driver.driverId]['time']}
                          <span className="box-place">{x[z.Driver.driverId]['position']} {gapBlock && gapBlock}</span>
                        </span> : <span>fuck</span>}
                      </span>
                    )

                  })}
               </div>
              )
            })}
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.data.statsBySeason ? state.data.statsBySeason.test : [],
  driversList: state.data.driversList,
  seasonsDrivers: state.data.seasonsDrivers,
  seasonQualify: state.data.seasonQualify.QualifyingResults,
  selectedTrack: state.selectedTrack,
});
export default connect(mapStateToProps)(RaceTimming);
