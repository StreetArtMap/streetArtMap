import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './ExplorePage.css'
import ArtContainer from '../../components/ArtContainer/ArtContainer'
import { v4 as uuidv4 } from 'uuid'
import MapWithMarkers from '../../components/MapWithMarkers/MapWithWithMarkers'

const ExplorePage = () => {
  const [targetArt, setTargetArt] = useState(null)
  const sortedArts = useSelector((state) => state.arts).sort(
    (a, b) => b.id - a.id
  )
  const selectedId = useSelector((state) => state.session.selectedArt)

  useEffect(() => {
    if (selectedId) {
      const selectedArt = sortedArts.find((art) => art.id === selectedId)
      setTargetArt(selectedArt)
    }
  }, [selectedId])

  const mappedArts = sortedArts.map((art) => (
    <ArtContainer art={art} key={uuidv4()} imageLink={true} />
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
    </>
  )
}

export default ExplorePage
