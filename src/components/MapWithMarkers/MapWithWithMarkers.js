import React, { useState, useEffect } from 'react'
import './MapWithMarkers.css'
// npm install --save react-map-gl
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl'
import MOCK_DATA from '../../MOCK_DATA'
import Button from '../../UIComponents/Button/Button'

const MapWithMarkers = ({ setRoute }) => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
    width: '100%',
    height: '100%',
  })

  const [selectedArt, setSelectedArt] = useState(null)

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedArt(null)
      }
    }
    window.addEventListener('keydown', listener)
  }, [])

  return (
    <section className='markers-map-container'>
      <Button onClick={() => setRoute(true)} className='toggle-maps-btn'>
        SEE ROUTES
      </Button>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/edignot/ckemah34j0amm19oe5hjne20p'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport)
        }}
      >
        <NavigationControl />
        {MOCK_DATA.map((tag) => (
          <Marker
            key={tag.id}
            latitude={tag.latitude}
            longitude={tag.longitude}
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                setSelectedArt(tag)
              }}
            >
              TAG
            </button>
          </Marker>
        ))}
        {selectedArt && (
          <Popup
            latitude={selectedArt.latitude}
            longitude={selectedArt.longitude}
            onClose={() => {
              setSelectedArt(null)
            }}
          >
            <h2>{selectedArt.name}</h2>
          </Popup>
        )}
      </ReactMapGL>
    </section>
  )
}

export default MapWithMarkers
