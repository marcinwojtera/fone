import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Label } from 'semantic-ui-react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import map  from 'lodash/map';

class RaceTimming extends Component {
  state = {
    rendered: false,
    selected: []
  }

  render() {
    const driversListToShow = ['leclerc','hamilton']
    return (
      <div> <div style={{overflow: 'hidden'}}>
        <PerfectScrollbar>
            <Button.Group>
              {this.props.seasonsDrivers.map(y =>  (
                <Button>
                  {y.Driver.familyName}
                </Button>
              ))}
            </Button.Group>
        </PerfectScrollbar>
          </div>



        <div className="race-timming">
          <div className="race-timming-sticky">
            {map(this.props.seasonQualify, z => {
              return (<div className="race-driver">{z.Driver.code}</div>)
            })}
          </div>



        <div className="race-timming-slide">




          <div className="timming-row" >
           {this.props.stats.map((x, i) =>  <span className="race-time-box">{i+1}</span>)}
          </div>

            {map(this.props.seasonQualify, z => {
              //
              return (

                <div className="timming-row" key={z.Driver.driverId}>
                  {this.props.stats.map((x, i) => {
                    // const test = checkPlace(i);
                    // if (i > 0 && x[z.Driver.driverId]) {
                    //   let test = this.props.stats[i-1][z.Driver.driverId]['position']
                    // } else {
                    //   const test = x[z.Driver.driverId] ? this.props.stats[i][z.Driver.driverId]['position'] : ''
                    // }
                    // console.log(test)
                    return (
                      <span className="race-time-box" key={`${z.Driver.driverId}-${i}`}>
                        {x[z.Driver.driverId]  ?  <span>{ x[z.Driver.driverId]['time']} <span className="box-place">{x[z.Driver.driverId]['position']}</span></span> : <span>fuck</span>}
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
  seasonQualify: state.data.seasonQualify.QualifyingResults
});
export default connect(mapStateToProps)(RaceTimming);
