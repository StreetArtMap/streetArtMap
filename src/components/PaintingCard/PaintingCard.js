import React from 'react'
import { useSelector } from 'react-redux'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import ArtDetails from '../ArtDetails/ArtDetails'
import ArtContainer from '../ArtContainer/ArtContainer'
import { v4 as uuidv4 } from 'uuid'
import MapWithMarkers from '../MapWithMarkers/MapWithWithMarkers'
import './PaintingCard.css'

const PaintingCard = () => {
  const selectedId = useSelector((state) => state.session.selectedArt)
  const art = useSelector((state) =>
    state.arts.find((art) => art.id === selectedId)
  )
  return (
    <section className='painting-card-container'>
      <ImageCarousel 
        images={art.images} 
        paintingCardCarousel={true} 
      />
      <ArtDetails art={art} />
      <section className='painting-card-map-container'>
        <MapWithMarkers
          zoom={17}
          lat={+art.latitude}
          lng={+art.longitude}
          paintingMap={true}
        />
      </section>
    </section>
  )
}

export default PaintingCard
