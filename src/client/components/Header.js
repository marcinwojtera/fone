import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchData } from '../actions';

class Header extends React.Component {
  generateYearLink = () => {

  };

  generateRacerLink = () => {
    const { seasonsList } = this.props;
    return;
  };

  render() {
    return (
      <div>
        <div>
          {this.props.seasonsYears.map((x) => (
            <Link
              key={x}
              to={{
                pathname: `/${x}`
              }}
            >
              {x}
            </Link>
          ))}

        </div>
        {this.props.seasonsList.map(x => (
          <Link
            key={`/${x.season}/${x.round}`}
            to={{
              pathname: `/${x.season}/${x.round}`
            }}
          >
            {x.raceName}
            <span>{x.Circuit.circuitName}-{x.Circuit.Location.country}- {x.Circuit.Location.locality}</span>
            <br />
          </Link>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsYears: state.data.seasonsYears,
  seasonsList: state.data.seasonsList || [],
});

export default withRouter(connect(mapStateToProps)(Header));
