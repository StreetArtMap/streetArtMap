import React from 'react'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import ArtDetails from '../ArtDetails/ArtDetails'
import { useSelector } from 'react-redux'
import MapWithMarkers from '../MapWithMarkers/MapWithWithMarkers'
import './PaintingCard.css'

const PaintingCard = () => {
  const selectedId = '15'
  const art = useSelector((state) =>
    state.arts.find((art) => art.id === selectedId)
  )
  console.log(art, selectedId)
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
