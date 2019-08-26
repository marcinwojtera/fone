import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Slider from 'react-slick';


class Header extends React.Component {
  generateYearLink = () => {

  };

  changeUrlEvent = (e) => {
    // e.preventDefault();
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };

    return (
      <div>
        <div>
          {this.props.seasonsYears.map((x) => (
            <Link
              key={x}
              to={{
                pathname: `/${x}`,
              }}
            >
              {x}
            </Link>
          ))}

        </div>

        <Slider {...settings}>
          {this.props.seasonsList.map(x => (
            <div key={x.raceName}>
           
                <h3>   <Link
                onClick={this.changeUrlEvent}
                key={`/${x.season}/${x.round}`}
                to={`/${x.season}/${x.round}`}
              >{x.raceName}</Link></h3> 
                <h5>
                  {x.Circuit.circuitName}
                  -
                  {x.Circuit.Location.country}
                  -
                  {' '}
                  {x.Circuit.Location.locality}
                </h5>
             
            </div>
          ))}

        </Slider>



      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsYears: state.data.seasonsYears,
  seasonsList: state.data.seasonsList || [],
});

export default withRouter(connect(mapStateToProps)(Header));
