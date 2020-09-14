import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectArt } from '../../actions/actions'
import ArtDetails from '../ArtDetails/ArtDetails'
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from 'react-map-gl'
import ImageCarousel from '../ImageCarousel/ImageCarousel'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaHeart, FaCheck } from 'react-icons/fa'
import { RiMapPin3Fill } from 'react-icons/ri'
import './MapWithMarkers.css'

const MapWithMarkers = ({
  formMap,
  paintingMap,
  zoom,
  latitude,
  longitude,
}) => {
  const dispatch = useDispatch()
  const selectedId = useSelector((state) => state.session.selectedArt)
  const selectedArt = useSelector((state) =>
    state.arts.find((art) => art.id === selectedId)
  )

  const [viewport, setViewport] = useState({
    latitude: latitude || 39.755697,
    longitude: longitude || -105.002651,
    zoom: zoom || 12,
    width: '100%',
    height: '100%',
  })

  useEffect(() => {
    selectedArt &&
      setViewport({
        latitude: +selectedArt.latitude,
        longitude: +selectedArt.longitude,
        zoom: 12,
        width: '100%',
        height: '100%',
      })
  }, [selectedArt])

  const markers = useSelector((state) => state.arts).map((art) => (
    <Marker
      key={art.id}
      latitude={+art.latitude}
      longitude={+art.longitude}
      offsetLeft={-20}
      offsetTop={-10}
    >
      <section
        className='map-pin-wrapper'
        id={art.id}
        onClick={(e) => {
          e.preventDefault()
          dispatch(selectArt(art.id))
          e.target.classList.add('active')
        }}
      >
        {art.favorite && !art.visited && (
          <FaHeart className='art-location-top-icon' />
        )}
        {art.visited && !art.favorite && (
          <FaCheck className='art-location-top-icon' />
        )}
        {art.favorite && art.visited && (
          <FaHeart className='art-location-top-icon' />
        )}
        {art.visited && art.favorite && (
          <FaCheck className='art-location-top-check-icon' />
        )}
        <RiMapPin3Fill className='art-location-icon' />
      </section>
    </Marker>
  ))

  const myMarker = (
    <Marker latitude={latitude} longitude={longitude}>
      <FaMapMarkerAlt className='my-location-icon' />
    </Marker>
  )

  return (
    <section className='markers-map-container'>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/edignot/ckemah34j0amm19oe5hjne20p'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport)
        }}
        className='react-map-container'
      >
        <GeolocateControl
          className='geolocation-control'
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserLocation={true}
        />
        <NavigationControl className='navigation-control' />
        {!formMap && markers}
        {formMap && myMarker}
        {selectedArt && (
          <Popup
            latitude={+selectedArt.latitude}
            longitude={+selectedArt.longitude}
            closeOnClick={false}
            closeButton={!paintingMap && true}
            onClose={() => dispatch(selectArt(''))}
            isOpen={true}
            offsetTop={!paintingMap && 130}
            tipSize={paintingMap ? 10 : 0}
          >
            <section
              className={`map-image-carousel-container ${
                paintingMap && 'painting-card-carousel-container'
              }`}
            >
              <Link to={`/arts/${selectedId}`}>
                <ImageCarousel
                  images={selectedArt.images}
                  mapCarousel={true}
                  paintingMapImage={paintingMap}
                />
              </Link>
            </section>
            <section className='map-art-details-container'>
              {!paintingMap && (
                <ArtDetails art={selectedArt} mapArtDetails={true} />
              )}
              <p className='map-artist-name'>{selectedArt.artist_name}</p>
            </section>
          </Popup>
        )}
      </ReactMapGL>
    </section>
  )
}

export default MapWithMarkers

MapWithMarkers.propTypes = {
  formMap: PropTypes.bool,
  paintingMap: PropTypes.bool,
  zoom: PropTypes.number,
  latitude: PropTypes.string,
  longitude: PropTypes.string,
}

Marker.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
}
