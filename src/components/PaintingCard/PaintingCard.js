import React from 'react'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import ArtDetails from '../ArtDetails/ArtDetails'
import { useSelector } from 'react-redux'
import MapWithMarkers from '../MapWithMarkers/MapWithWithMarkers'
import './PaintingCard.css'

const PaintingCard = () => {
  const selectedId = useSelector((state) => state.session.selectedArt)
  const art = useSelector((state) =>
    state.arts.find((art) => art.id === selectedId)
  )
  return (
    <section className='painting-card-container'>
      <ImageCarousel images={art.images} height={500} />
      <ArtDetails art={art} />
      <section className='map-container'>
        <MapWithMarkers
          zoom={14}
          lat={+art.latitude}
          lng={+art.longitude}
          paintingMap={true}
        />
      </section>
    </section>
  )
}

export default PaintingCard
