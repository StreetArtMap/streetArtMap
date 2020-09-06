import React, { useState, useEffect } from 'react'
import './MapWithMarkers.css'
// npm install --save react-map-gl
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl'
import MOCK_DATA from '../../MOCK_DATA'
import Button from '../../UIComponents/Button/Button'

const MapWithMarkers = ({ setRoute }) => {
  const [selectedArt, setSelectedArt] = useState(null)
  const [myLocation, setMyLocation] = useState({
    latitude: 39.744137,
    longitude: -104.95005,
  })

  const [viewport, setViewport] = useState({
    latitude: myLocation.latitude,
    longitude: myLocation.longitude,
    zoom: 10,
    width: '100%',
    height: '100%',
  })

  const getLocation = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert('Geo Location is not supported by your device')
    }
  }

  const showPosition = (position) => {
    const location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    }
    setMyLocation(location)
    return location
  }

  useEffect(() => {
    getLocation()
  }, [myLocation])

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedArt(null)
      }
      // if (!e.target.className.includes('active')) {
      //   setSelectedArt(null)
      // }
    }
    window.addEventListener('keydown', listener)
    window.addEventListener('click', listener)
  }, [])

  const markers = MOCK_DATA.map((tag) => (
    <Marker key={tag.id} latitude={tag.latitude} longitude={tag.longitude}>
      <button
        onClick={(e) => {
          e.preventDefault()
          setSelectedArt(tag)
          e.target.classList.add('active')
        }}
      >
        TAG
      </button>
    </Marker>
  ))

  const myMarker = (
    <Marker latitude={myLocation.latitude} longitude={myLocation.longitude}>
      <button>MY LOCATION</button>
    </Marker>
  )

  return (
    <section className='markers-map-container'>
      <button onClick={() => setRoute(true)} className='toggle-maps-btn'>
        SEE ROUTES
      </button>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/edignot/ckemah34j0amm19oe5hjne20p'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport)
        }}
        className='react-map-container'
      >
        <NavigationControl className='navigation-control'/>
        {markers}
        {myMarker}
        {selectedArt && (
          <Popup
            latitude={selectedArt.latitude}
            longitude={selectedArt.longitude}
            onClose={() => {
              setSelectedArt(false)
            }}
            closeOnClick={true}
            closeButton={false}
            isOpen={true}
          >
            <Button>SELECTED ART</Button>
            <img
              src={MOCK_DATA[0].image_urls[0]}
              width='200px'
              height='200px'
            />
          </Popup>
        )}
      </ReactMapGL>
    </section>
  )
}

export default MapWithMarkers
