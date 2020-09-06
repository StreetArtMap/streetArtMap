import React from 'react'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import ArtDetails from '../ArtDetails/ArtDetails'
import './ArtContainer.css'

const ArtContainer = ({ art }) => {
  return (
    <section className='art-container'>
      <ImageCarousel images={art.image_urls} height={300} />
      <ArtDetails art={art} />
    </section>
  )
}

export default ArtContainer