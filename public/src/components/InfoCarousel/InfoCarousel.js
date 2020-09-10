import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from '../Base/Container';
import { CTALink } from '../CTALink/CTALink';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./InfoCarousel.css";

export class InfoCarousel extends Component {
  render () {
    const slides = this.props.slides;
    const settings = {
      autoplay: true,
      autoplaySpeed: 6000,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="info-carousel">
        <Container>
          <Slider {...settings} className="info-carousel__slider">
            {
              slides.map(slide => (
                <a href={slide.link} className="info-carousel__slide" key={slide.id}>
                  <img src={process.env.RAZZLE_RUNTIME_API_URL + slide.carouselImage.url} alt="" />
                  <div>{slide.ctaStyle ? slide.ctaStyle : ""}</div>
                  <div className="info-carousel__slide-cta" style={{right: slide.ctaRightOffset ? slide.ctaRightOffset : 0}}>
                    <CTALink
                      key={slide.id}
                      title={slide.cta.title}
                      type={slide.cta.type}
                    />
                  </div>
                </a>
              ))
            }
          </Slider>
        </Container>
      </div>
    );
  }
}

InfoCarousel.propTypes = {
  slides: PropTypes.array.isRequired
};

export default InfoCarousel;
