import React from 'react'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import './MapWithNavigation.css'
import style from './mapWithNavigationStyle'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

class MapWithNavigation extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const arts = this.props.arts.slice(0, 10)

    const map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [+arts[2].longitude, +arts[2].latitude],
      zoom: 10,
    })

    map.on('load', function () {
      directions.setOrigin([+arts[2].longitude, +arts[2].latitude])
      arts.forEach((art) => {
        directions.addWaypoint(arts.indexOf(art), [
          +art.longitude,
          +art.latitude,
        ])
      })
      directions.setDestination([+arts[9].longitude, +arts[9].latitude])
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

export const mapState = (state) => ({
  arts: state.arts,
})

export default connect(mapState)(MapWithNavigation)
