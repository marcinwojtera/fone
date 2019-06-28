import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchData, setUrlData } from '../actions';
import { withRouter } from 'react-router';

class Header extends React.Component {

  generateYearLink = () => {
    const { seasonsList } = this.props;
    return seasonsList.map(x => (
      <Link
        key={x.season}
        to={{
          pathname: `/${x.season}`
        }}
      >
        {x.season}
      </Link>
    ));
  };

  generateRacerLink = () => {
    const { raceList } = this.props;
    return raceList.map(x => (
      <Link
        key={`/${x.season}/${x.round}`}
        to={{
          pathname: `/${x.season}/${x.round}`
        }}
      >
        {x.raceName} 
        <span>{x.Circuit.circuitName}-{x.Circuit.Location.country}- {x.Circuit.Location.locality}</span>
        <br/> 
      </Link>
    ));
  };

  render() {
    return (
      <div>
        <div>{this.generateYearLink()}</div>
        <div>{this.generateRacerLink()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsList: state.data.seasonsList || [],
  raceList: state.data.raceList || []
});

export default withRouter(connect(mapStateToProps)(Header));
