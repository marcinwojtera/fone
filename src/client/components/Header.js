import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import { Icon } from 'semantic-ui-react'
import DriversHeader from './DriversHeader'

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
      slickGoTo: 12,
      // centerPadding: "60px",
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 6,
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
      <div>
        <Slider {...settings}>
          {this.props.seasonsList.map(x => (
            <Link
              className="slide-box"
              key={`/${x.season}/${x.round}`}
              to={`/race/${x.season}/${x.round}`}
            >
              <div key={x.raceName} >
                <h5>{x.raceName}{' '}</h5>

                <small>
                  {x.Circuit.circuitName}
                </small>
                {this.props.selectedSeason === x.round && <span className="round-see"><Icon name="caret down" /></span>}
            </div> </Link>
          ))}
        </Slider>

        {this.props.homepage !== '/' &&  <DriversHeader /> }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsYears: state.data.seasonsYears,
  selectedSeason: state.navigation.season,
  seasonsList: state.data.seasonsList || [],
  slide: state.navigation.season || 1,
  homepage: state.navigation.pathname,
});

export default withRouter(connect(mapStateToProps)(Header));
