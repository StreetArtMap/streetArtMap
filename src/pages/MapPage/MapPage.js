import React from 'react'
import MapWithMarkers from '../../components/MapWithMarkers/MapWithWithMarkers'
import './MapPage.css'

const MapPage = () => {
  return (
    <section className='map-container' data-testid='map-container'>
      <MapWithMarkers />
    </section>
  )
}

export default MapPage
