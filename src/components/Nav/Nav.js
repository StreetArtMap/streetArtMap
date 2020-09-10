import React, { useState } from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaMapMarked, FaSearch } from 'react-icons/fa'
import { ImCamera } from 'react-icons/im'
import ScrollHide from '../../UIComponents/ScrollHide/ScrollHide'
import { selectArt } from '../../actions/userAction'

const Nav = ({ selectArt }) => {
  const [shouldHideHeader, setShouldHideHeader] = useState(false)
  const [shouldShowShadow, setShouldShowShadow] = useState(false)

  const MINIMUM_SCROLL = 80
  const TIMEOUT_DELAY = 400

  ScrollHide((callbackData) => {
    const { previousScrollTop, currentScrollTop } = callbackData
    const isScrolledDown = previousScrollTop < currentScrollTop
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL

    setShouldShowShadow(currentScrollTop > 2)

    setTimeout(() => {
      setShouldHideHeader(isScrolledDown && isMinimumScrolled)
    }, TIMEOUT_DELAY)
  })

  const shadowStyle = shouldShowShadow ? 'shadow' : ''
  const hiddenStyle = shouldHideHeader ? 'hidden' : ''

  return (
    <footer className={`footer ${shadowStyle} ${hiddenStyle}`}>
      <section className='nav-box' onClick={() => selectArt(null)}>
        <NavLink to='/explore' className='nav-link'>
          <FaSearch className='nav-icon' title='search-icon' />
          <p className='nav-text'>explore</p>
        </NavLink>
      </section>
      <section className='nav-box'>
        <NavLink to='/map' className='nav-link'>
          <FaMapMarked className='nav-icon' title='map-icon' />
          <p className='nav-text'>map</p>
        </NavLink>
      </section>
      <section className='nav-box'>
        <NavLink to='/create' className='nav-link'>
          <ImCamera className='nav-icon' title='camera-icon' />
          <p className='nav-text'>create</p>
        </NavLink>
      </section>
      <section className='nav-box'>
        <NavLink to='/profile' className='nav-link'>
          <BsFillPersonFill className='nav-icon' title='profile-icon' />
          <p className='nav-text'>profile</p>
        </NavLink>
      </section>
    </footer>
  )
}

const mapDispatch = (dispatch) => ({
  selectArt: (id) => dispatch(selectArt(id)),
})

export default connect(null, mapDispatch)(Nav)
