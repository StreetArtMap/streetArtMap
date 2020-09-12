import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectArt } from '../../actions/userAction'
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
            height={height}
            className={`carousel-img ${mapCarousel && 'map-carousel'} ${
              paintingCardCarousel && 'painting-card-carousel'
            }`}
            onError={addDefaultImageSrc}
          />
        ))}
    </Slider>
  )
}

export default ImageCarousel
