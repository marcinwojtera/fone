import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import { Button, Icon } from 'semantic-ui-react'
import { map } from 'lodash'
import './DriversHeader.scss';


const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", zIndex: 999 }}
      onClick={onClick}
    ><Icon name="chevron right" /></div>
  );
}
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", zIndex: 999 }}
      onClick={onClick}
    ><Icon name="chevron left" /></div>
  );
}
class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      // centerPadding: "60px",
      speed: 500,
      slidesToShow: 10,
      slidesToScroll: 10,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 6,
          }
        },
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 5,
          }
        },
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 4,
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="driver-list-slider">
        <Slider {...settings} >
          {map(this.props.seasonsDrivers, (x, i)=> {
            return(
                <Link
                  className="slide-box"
                  key={x.Driver.givenName}
                  to={`/driver/${x.Driver.driverId}/${this.props.year}`}
                >
                  <div key={x.raceName} >
                      <span className={"driver-box " + (this.props.selectedDriver === x.Driver.driverId ? 'selected' : '')}>
                      {x.Driver.familyName} {x.Driver.givenName}
                    </span>
                    <small className="driver-info">{x.Constructors[0].name}</small>
                  </div> </Link>
              )
          })}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDriver: state.navigation.driver,
  year: state.navigation.year,
  seasonsDrivers: state.data.seasonsDrivers,
});

export default withRouter(connect(mapStateToProps)(Header));
