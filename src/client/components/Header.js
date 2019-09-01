import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import { Label, Icon } from 'semantic-ui-react'
import {img} from '../img/f1-car.jpg';

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

  render() {
    const settings = {
      dots: false,
      infinite: true,
      centerPadding: "60px",
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 4,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
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
                <span className="round">{x.round}</span>
                <h5>{x.raceName}{' '}</h5>
                <Label color='red' key={x.round} size={'small'}>
                  <Icon name='calendar alternate outline' /> {x.date}
                </Label>
                <small>
                  {x.Circuit.circuitName}
                </small>
                {this.props.selectedSeason === x.round && <span className="round-see"><Icon name="caret up" /></span>}
<img src={img}/>
                <span className="round-city"> <Icon name='map marker alternate' /> {x.Circuit.Location.locality}</span>
            </div> </Link>
          ))}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  seasonsYears: state.data.seasonsYears,
  selectedSeason: state.navigation.season,
  seasonsList: state.data.seasonsList || [],
  slide: state.navigation.season || 1,
});

export default withRouter(connect(mapStateToProps)(Header));
