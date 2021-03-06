import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectArt } from '../../actions/actions'
import { v4 as uuidv4 } from 'uuid'
import { DEFAULT_IMG_URL } from '../../constants'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './ImageCarousel.css'

const ImageCarousel = ({
  images,
  height,
  id,
  imageLink,
  mapCarousel,
  paintingMapImage,
  paintingCardCarousel,
}) => {
  const dispatch = useDispatch()
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
        imageLink &&
        images.map((image) => (
          <Link to={`/arts/${id}`} key={uuidv4()}>
            <img
              id={id}
              src={image}
              alt={image}
              data-testid="image"
              className={`carousel-img main-carousel`}
              onError={addDefaultImageSrc}
              onClick={() => {
                dispatch(selectArt(id))
                window.scrollTo(0, 0)
              }}
            />
          </Link>
        ))}
      {images &&
        !imageLink &&
        images.map((image) => (
          <img
            id={id}
            src={image}
            alt={image}
            data-testid="image"
            height={height}
            key={uuidv4()}
            className={`carousel-img ${mapCarousel && 'map-carousel'} ${
              paintingMapImage && 'painting-card-map-carousel'
            } ${paintingCardCarousel && 'painting-card-carousel'}`}
            onError={addDefaultImageSrc}
          />
        ))}
    </Slider>
  )
}

export default ImageCarousel

ImageCarousel.propTypes = {
  images: PropTypes.array,
  height: PropTypes.number,
  id: PropTypes.string,
  imageLink: PropTypes.bool,
  mapCarousel: PropTypes.bool,
  paintingMapImage: PropTypes.bool,
  paintingCardCarousel: PropTypes.bool
}
