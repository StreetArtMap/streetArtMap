import React from 'react'
import PropTypes from 'prop-types'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import ArtDetails from '../ArtDetails/ArtDetails'
import './ArtContainer.css'

const ArtContainer = ({ art, imageLink, setLoading, setError }) => {
  return (
    <section className='art-container' data-testid='art-container'>
      <ImageCarousel images={art.images} id={art.id} imageLink={imageLink} />
      <ArtDetails art={art} setLoading={setLoading} setError={setError} />
    </section>
  )
}

export default ArtContainer

ArtContainer.propTypes = {
  art: PropTypes.object,
  imageLink: PropTypes.bool,
  setLoading: PropTypes.func,
  setError: PropTypes.func,
}
