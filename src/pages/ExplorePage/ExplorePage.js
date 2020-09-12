import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ArtContainer from '../../components/ArtContainer/ArtContainer'
import LoadingSpinner from '../../UIComponents/LoadingSpinner/LoadingSpinner'
import MapWithMarkers from '../../components/MapWithMarkers/MapWithWithMarkers'
import { v4 as uuidv4 } from 'uuid'
import './ExplorePage.css'

const ExplorePage = () => {
  const [targetArt, setTargetArt] = useState(null)
  const [loading, setLoading] = useState(false)
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
    </>
  )
}

export default ExplorePage
