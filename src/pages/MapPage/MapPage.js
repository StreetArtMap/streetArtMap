import React, { useState } from 'react'
import MapWithNavigation from '../../components/MapWithNavigation/MapWithNavigation'
import MapWithMarkers from '../../components/MapWithMarkers/MapWithWithMarkers'

const MapPage = () => {
  const [route, setRoute] = useState(false)

  return (
    <section>
      {route ? (
        <MapWithNavigation setRoute={setRoute} />
      ) : (
        <MapWithMarkers setRoute={setRoute} />
      )}
    </section>
  )
}

export default MapPage
