import React from 'react'
import PropTypes from 'prop-types'
import './LoadingSpinner.css'

const LoadingSpinner = ({ asOverlay }) => {
  return (
    <section className={`${asOverlay && 'loading-spinner__overlay'}`}>
      <section className='lds-dual-ring'></section>
    </section>
  )
}

export default LoadingSpinner

LoadingSpinner.propTypes = {
  asOverlay: PropTypes.bool
}
