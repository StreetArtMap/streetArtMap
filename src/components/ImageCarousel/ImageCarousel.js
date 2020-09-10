import React from 'react'
import Slider from 'react-slick'
import { connect } from 'react-redux'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './ImageCarousel.css'
import { DEFAULT_IMG_URL } from '../../constants'
import { v4 as uuidv4 } from 'uuid'
import { selectArt } from '../../actions/userAction'
import { Link } from 'react-router-dom'

const ImageCarousel = ({ images, height, id, selectArt }) => {
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
          <Link to={`/arts/${id}`}>
            <img
              id={id}
              src={image}
              alt={image}
              height={height}
              className='carousel-img'
              onError={addDefaultImageSrc}
              key={uuidv4()}
              onClick={() => {
                selectArt(id)
              }}
            />
          </Link>
        ))}
    </Slider>
  )
}

const mapDispatch = (dispatch) => ({
  selectArt: (id) => dispatch(selectArt(id)),
})

export default connect(null, mapDispatch)(ImageCarousel)
