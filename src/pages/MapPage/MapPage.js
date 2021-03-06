import React, { useState } from 'react'
import MapWithMarkers from '../../components/MapWithMarkers/MapWithWithMarkers'
import './MapPage.css'
import axios from 'axios'
import Button from '../../UIComponents/Button/Button'
import Modal from '../../UIComponents/Modal/Modal'
import LoadingSpinner from '../../UIComponents/LoadingSpinner/LoadingSpinner'
import { FaRoute } from 'react-icons/fa'

const MapPage = () => {
  const [displayModal, setDisplayModal] = useState(false)
  const [tours, setTours] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const getTours = async () => {
    try {
      return await axios.get('https://streetwalker-backend.herokuapp.com/tours')
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowTours = () => {
    getTours()
    .then((response) => {
      showTours(response.data.data.allTours)
      setIsLoading(false)
    })
    .catch((error) => {
      setError(error.message)
      setIsLoading(false)
      console.log(error)
    })
    setIsLoading(true)
    setDisplayModal(true)
  }

  const showTours = (tours) => {
    const unpackedTours = tours.map((tour) => {
      return (
        <Button key={tour.id} href={tour.link} styling='padding'>
          {tour.name}
        </Button>
      )
    })
    setTours(unpackedTours)
  }

  return (
    <>
      <section className='map-container' data-testid='map-container'>
        <section className='map-tours-btn' onClick={handleShowTours}>
          <FaRoute
            className='tour-icon'
            title='tours-icon'
            data-testid='tours-icon'
            onClick={() => getTours()}
          />
          <p>art tours</p>
        </section>
        <MapWithMarkers />
      </section>
      <Modal show={displayModal}>
        <p className='modal-message'>Curated Walking Tours</p>
        {tours}
        <Button styling='padding' onClick={() => setDisplayModal(false)}>
          back
        </Button>
      </Modal>
      <Modal show={error}>
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
      {isLoading && <LoadingSpinner asOverlay />}
    </>
  )
}

export default MapPage
