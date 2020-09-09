import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './ImageCarousel.css'
import { DEFAULT_IMG_URL } from '../../constants'
import { v4 as uuidv4 } from 'uuid';

const ImageCarousel = ({ images, height }) => {
  const addDefaultImageSrc = (e) => {
    e.target.src = DEFAULT_IMG_URL
  }
  return (
    <Slider
      dots={true}
      infinite={true}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
    >
      {images &&
        images.map((image) => (
          <img
            src={image}
            alt={image}
            height={height}
            className='carousel-img'
            onError={addDefaultImageSrc}
            key={uuidv4()}
          />
        ))}
    </Slider>
  )
}

export default ImageCarousel
