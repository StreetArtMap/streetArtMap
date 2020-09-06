import React from 'react'
import ImageCarousel from '../ImageCarousel/ImageCarousel'

const ArtContainer = ({ art }) => {
  return (
    <section>
      <ImageCarousel images={art.image_urls} />
      THIS IS A NEW PIECE OF ART
    </section>
  )
}

export default ArtContainer
