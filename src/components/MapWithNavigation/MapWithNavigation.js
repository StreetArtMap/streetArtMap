import React from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import './MapWithNavigation.css'
import style from './mapWithNavigationStyle'
import MOCK_DATA from '../../MOCK_DATA'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

class MapWithNavigation extends React.Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [MOCK_DATA[0].longitude, MOCK_DATA[0].latitude],
      zoom: 10,
    })

    map.on('load', function () {
      directions.setOrigin([MOCK_DATA[0].longitude, MOCK_DATA[0].latitude])
      directions.addWaypoint(0, [MOCK_DATA[1].longitude, MOCK_DATA[2].latitude])
      directions.addWaypoint(1, [MOCK_DATA[2].longitude, MOCK_DATA[2].latitude])
      directions.addWaypoint(2, [-94.676392, 39.106667])
      directions.addWaypoint(2, [-106.50573, 31.773088])
      directions.setDestination([MOCK_DATA[0].longitude, MOCK_DATA[0].latitude])
    })

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'imperial',
      profile: 'mapbox/driving',
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
        className='navigation-map-container'
      >
        {this.marker}
      </section>
    )
  }
}
export default MapWithNavigation
