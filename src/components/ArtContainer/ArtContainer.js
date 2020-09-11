import React from 'react'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import ArtDetails from '../ArtDetails/ArtDetails'
import './ArtContainer.css'

const ArtContainer = ({ art, imageLink, setLoading }) => {
  return (
    <section className='art-container'>
      <ImageCarousel
        images={art.images}
        id={art.id}
        height={300}
        imageLink={imageLink}
      />
      <ArtDetails art={art} setLoading={setLoading} />
    </section>
  )
}

export default ArtContainer
