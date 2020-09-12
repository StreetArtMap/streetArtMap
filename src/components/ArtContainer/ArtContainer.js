import React from 'react'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import ArtDetails from '../ArtDetails/ArtDetails'
import './ArtContainer.css'

const ArtContainer = ({ art, imageLink, setLoading, setError }) => {
  return (
    <section className='art-container'>
      <ImageCarousel images={art.images} id={art.id} imageLink={imageLink} />
      <ArtDetails art={art} setLoading={setLoading} setError={setError} />
    </section>
  )
}

export default ArtContainer
