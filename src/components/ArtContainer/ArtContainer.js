import React from 'react'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import ArtDetails from '../ArtDetails/ArtDetails'

const ArtContainer = ({ art }) => {
  return (
    <section>
      <ImageCarousel images={art.image_urls} />
      <ArtDetails art={art} />
    </section>
  )
}

export default ArtContainer
