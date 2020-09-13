import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import ArtDetails from '../ArtDetails/ArtDetails'
import MapWithMarkers from '../MapWithMarkers/MapWithWithMarkers'
import LoadingSpinner from '../../UIComponents/LoadingSpinner/LoadingSpinner'
import Modal from '../../UIComponents/Modal/Modal'
import Button from '../../UIComponents/Button/Button'
import './PaintingCard.css'

const PaintingCard = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const selectedId = useSelector((state) => state.session.selectedArt)
  const art = useSelector((state) =>
    state.arts.find((art) => art.id === selectedId)
  )

  return (
    <section className='painting-card-container'>
      <ImageCarousel images={art.images} paintingCardCarousel={true} />
      <ArtDetails art={art} setError={setError} setLoading={setLoading} />
      <section className='painting-card-map-container'>
        <MapWithMarkers
          zoom={17}
          lat={+art.latitude}
          lng={+art.longitude}
          paintingMap={true}
        />
      </section>
      {loading && <LoadingSpinner asOverlay />}
      {error && (
        <Modal show={true}>
          <p className='modal-message error-message'>{error}</p>
          <Button
            styling='padding'
            onClick={() => {
              setError('')
            }}
          >
            close
          </Button>
        </Modal>
      )}
    </section>
  )
}

export default PaintingCard
