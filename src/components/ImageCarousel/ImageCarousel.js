import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ImageCarousel = ({ images }) => {
  const slides = images.map((image) => <img src={image} height='300' />)

  return (
    <Slider
      dots={true}
      infinite={true}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
    >
      {slides}
    </Slider>
  )
}

export default ImageCarousel
