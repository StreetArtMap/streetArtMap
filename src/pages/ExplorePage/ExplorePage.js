import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ArtContainer from '../../components/ArtContainer/ArtContainer'
import LoadingSpinner from '../../UIComponents/LoadingSpinner/LoadingSpinner'
import MapWithMarkers from '../../components/MapWithMarkers/MapWithWithMarkers'
import Modal from '../../UIComponents/Modal/Modal'
import Button from '../../UIComponents/Button/Button'
import { v4 as uuidv4 } from 'uuid'
import './ExplorePage.css'

const ExplorePage = () => {
  const [targetArt, setTargetArt] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const sortedArts = useSelector((state) => state.arts).sort(
    (a, b) => b.id - a.id
  )
  const selectedId = useSelector((state) => state.session.selectedArt)

  useEffect(() => {
    if (selectedId) {
      const selectedArt = sortedArts.find((art) => art.id === selectedId)
      setTargetArt(selectedArt)
    }
    //eslint-disable-next-line
  }, [selectedId])

  const mappedArts = sortedArts.map((art) => (
    <ArtContainer
      art={art}
      key={uuidv4()}
      imageLink={true}
      setLoading={setLoading}
      setError={setError}
    />
  ))

  return (
    <>
      {!selectedId && (
        <section className='explore-container'>{mappedArts}</section>
      )}
      {targetArt && (
        <section className='map-container'>
          <MapWithMarkers
            formMap={true}
            zoom={14}
            lat={+targetArt.latitude}
            lng={+targetArt.longitude}
          />
        </section>
      )}
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
    </>
  )
}

export default ExplorePage
