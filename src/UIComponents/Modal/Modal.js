import React from 'react'
import PropTypes from 'prop-types'
import './Modal.css'

const Modal = ({ show, children }) => {
  const showOrHide = show ? 'modal display-block' : 'modal display-none'

  return (
    <section className={showOrHide}>
      <section className='modal-main'>{children}</section>
    </section>
  )
}

export default Modal

Modal.propTypes = {
  children: PropTypes.node
}
