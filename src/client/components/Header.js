import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import { Label } from 'semantic-ui-react'


class Header extends React.Component {

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
        <Slider {...settings}>
          {this.props.seasonsList.map(x => (
            <div key={x.raceName}>

                <h3>   <Link
                key={`/${x.season}/${x.round}`}
                to={`/race/${x.season}/${x.round}`}
              >{x.raceName}
                  <Label color='red' key={x.round}>
                    {' '} {x.date}
                  </Label>

                </Link></h3>
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
