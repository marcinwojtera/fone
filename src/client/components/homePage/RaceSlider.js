import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import { Icon } from 'semantic-ui-react'
import DriversHeader from '../DriversHeader'

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
class RaceSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      beforeChange: function(currentSlide, nextSlide) {
        console.log("before change", currentSlide, nextSlide);
      },
      afterChange: function(currentSlide) {
        console.log("after change", currentSlide);
      }
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



      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedSeason: state.navigation.season,
  seasonsList: state.data.seasonsList || [],
  slide: state.navigation.season || 1,
});

export default withRouter(connect(mapStateToProps)(RaceSlider));
