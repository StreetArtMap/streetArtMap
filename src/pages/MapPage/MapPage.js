import React, { useState } from 'react'
import MapWithNavigation from '../../components/MapWithNavigation/MapWithNavigation'
import MapWithMarkers from '../../components/MapWithMarkers/MapWithWithMarkers'
import './MapPage.css'

const MapPage = () => {
  const [route, setRoute] = useState(false)

  return (
    <section className='map-container'>
      {route ? (
        <MapWithNavigation setRoute={setRoute} />
      ) : (
        <MapWithMarkers setRoute={setRoute} />
      )}
    </section>
  )
}

export default MapPage
