import React from 'react'

// npm install --save mapbox-gl
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// npm install --save @mapbox/mapbox-gl-directions
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

import './MapWithNavigation.css'
// Using mock data for now
import MOCK_DATA from '../../MOCK_DATA'

// add MapBox key to .env and gitignore
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

class MapWithNavigation extends React.Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [MOCK_DATA[0].longitude, MOCK_DATA[0].latitude],
      zoom: 10,
    })

    // Start A and End B points are displaying route, but waypoints don't show up, no error
    map.on('load', function () {
      directions.setOrigin([MOCK_DATA[0].longitude, MOCK_DATA[0].latitude])
      directions.addWaypoint(0, [MOCK_DATA[2].longitude, MOCK_DATA[2].latitude])
      directions.addWaypoint(1, [-94.676392, 39.106667])
      directions.setDestination([MOCK_DATA[1].longitude, MOCK_DATA[1].latitude])
    })

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      placeholderDestination: 'end',
      placeholderOrigin: 'start',
      controls: {
        profileSwitcher: true,
      },
      alternatives: true,
      styles: style,
    })

    map.addControl(directions, 'top-left')
  }

  render() {
    return (
      <section
        ref={(el) => (this.mapWrapper = el)}
        className='navigation-map-wrapper'
      ></section>
    )
  }
}
export default MapWithNavigation

// default styles object, can be customized
const style = [
  {
    id: 'directions-route-line-alt',
    type: 'line',
    source: 'directions',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#bbb',
      'line-width': 4,
    },
    filter: [
      'all',
      ['in', '$type', 'LineString'],
      ['in', 'route', 'alternate'],
    ],
  },
  {
    id: 'directions-route-line-casing',
    type: 'line',
    source: 'directions',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#2d5f99',
      'line-width': 12,
    },
    filter: ['all', ['in', '$type', 'LineString'], ['in', 'route', 'selected']],
  },
  {
    id: 'directions-route-line',
    type: 'line',
    source: 'directions',
    layout: {
      'line-cap': 'butt',
      'line-join': 'round',
    },
    paint: {
      'line-color': {
        property: 'congestion',
        type: 'categorical',
        default: '#4882c5',
        stops: [
          ['unknown', '#4882c5'],
          ['low', '#4882c5'],
          ['moderate', '#f09a46'],
          ['heavy', '#e34341'],
          ['severe', '#8b2342'],
        ],
      },
      'line-width': 7,
    },
    filter: ['all', ['in', '$type', 'LineString'], ['in', 'route', 'selected']],
  },
  {
    id: 'directions-hover-point-casing',
    type: 'circle',
    source: 'directions',
    paint: {
      'circle-radius': 8,
      'circle-color': '#fff',
    },
    filter: ['all', ['in', '$type', 'Point'], ['in', 'id', 'hover']],
  },
  {
    id: 'directions-hover-point',
    type: 'circle',
    source: 'directions',
    paint: {
      'circle-radius': 6,
      'circle-color': '#3bb2d0',
    },
    filter: ['all', ['in', '$type', 'Point'], ['in', 'id', 'hover']],
  },
  {
    id: 'directions-waypoint-point-casing',
    type: 'circle',
    source: 'directions',
    paint: {
      'circle-radius': 8,
      'circle-color': '#fff',
    },
    filter: ['all', ['in', '$type', 'Point'], ['in', 'id', 'waypoint']],
  },
  {
    id: 'directions-waypoint-point',
    type: 'circle',
    source: 'directions',
    paint: {
      'circle-radius': 6,
      'circle-color': '#8a8bc9',
    },
    filter: ['all', ['in', '$type', 'Point'], ['in', 'id', 'waypoint']],
  },
  {
    id: 'directions-origin-point',
    type: 'circle',
    source: 'directions',
    paint: {
      'circle-radius': 18,
      'circle-color': '#3bb2d0',
    },
    filter: ['all', ['in', '$type', 'Point'], ['in', 'marker-symbol', 'A']],
  },
  {
    id: 'directions-origin-label',
    type: 'symbol',
    source: 'directions',
    layout: {
      'text-field': 'A',
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    paint: {
      'text-color': '#fff',
    },
    filter: ['all', ['in', '$type', 'Point'], ['in', 'marker-symbol', 'A']],
  },
  {
    id: 'directions-destination-point',
    type: 'circle',
    source: 'directions',
    paint: {
      'circle-radius': 18,
      'circle-color': '#8a8bc9',
    },
    filter: ['all', ['in', '$type', 'Point'], ['in', 'marker-symbol', 'B']],
  },
  {
    id: 'directions-destination-label',
    type: 'symbol',
    source: 'directions',
    layout: {
      'text-field': 'B',
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    paint: {
      'text-color': '#fff',
    },
    filter: ['all', ['in', '$type', 'Point'], ['in', 'marker-symbol', 'B']],
  },
]
