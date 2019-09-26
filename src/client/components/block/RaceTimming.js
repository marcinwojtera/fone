import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { Helmet } from "react-helmet";
import { filter, map } from 'lodash'
import { Button }  from 'semantic-ui-react';
import PerfectScrollbar from 'react-perfect-scrollbar'

class RaceTimming extends Component {
  state = {
    rendered: false,
    selected: [],
    driversListToShow: ['leclerc','hamilton', 'max_verstappen', 'kubica']
  }

  selectDriver = (driver) => {
    let selecteddriver = this.state.driversListToShow;
    const filterExist = selecteddriver.indexOf(driver) >= 0

    if (filterExist) {
      selecteddriver = filter(this.state.driversListToShow, (n => n !== driver));
    } else {
      selecteddriver.push(driver);
    }

    this.setState({ driversListToShow: selecteddriver })
  }
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>F1 statistics - {`${this.props.selectedTrack.raceName} Year: ${this.props.selectedTrack.season}`}</title>
          <meta name="description" content={`${this.props.selectedTrack.raceName} Year - ${this.props.selectedTrack.season} Race timming`} />
        </Helmet>
        <div style={{overflow: 'hidden'}}>
          </div>
       <div>

         {map(this.props.seasonsDrivers, z => {
           return ( <Button
             color={this.state.driversListToShow.indexOf(z.Driver.driverId) >= 0 ? 'pink': null}
             size={'mini'}
             name={z.Driver.driverId}
             key={z.Driver.code}
             style={{padding: '5px 8px'}}
             onClick={()=> this.selectDriver(z.Driver.driverId)}
           >{z.Driver.code}</Button>)
         })}
       </div>

        <div className="race-timming">
          <div className="race-timming-sticky">
            <div className="race-driver"><Icon naame="user circle"/></div>
            {map(this.props.seasonQualify, z => {
              return this.state.driversListToShow.indexOf(z.Driver.driverId) >= 0 ? (<div className="race-driver" key={z.Driver.code}>{z.Driver.code}</div>) : null
            })}
          </div>
          <PerfectScrollbar>
        <div className="race-timming-slide">

          <div className="timming-row" >
           {this.props.stats.map((x, i) =>  <span className="race-time-box" key={i+1}><small>Lap {i+1}</small></span>)}
          </div>

            {map(this.props.seasonQualify, (z, d) => {
              return this.state.driversListToShow.indexOf(z.Driver.driverId) >= 0 ? (
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
                        </span> : <span>---</span>}
                      </span>
                    )

                  })}
               </div>
              ) : null
            })}
        </div>
          </PerfectScrollbar>
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
