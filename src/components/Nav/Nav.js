import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectArt } from '../../actions/actions'
import ScrollHide from '../../UIComponents/ScrollHide/ScrollHide'
import { BsFillPersonFill, BsFillHouseDoorFill } from 'react-icons/bs'
import { FaMapMarked } from 'react-icons/fa'
import { ImCamera } from 'react-icons/im'
import './Nav.css'

const Nav = () => {
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

  const dispatch = useDispatch()

  return (
    <footer className={`footer ${shadowStyle} ${hiddenStyle}`}>
      <section className='nav-box'>
        <NavLink
          to='/explore'
          className='nav-link'
          onClick={() => {
            dispatch(selectArt(''))
            window.scrollTo(0, 0)
          }}
        >
          <BsFillHouseDoorFill className='nav-icon' title='search-icon' />
          <p className='nav-text'>explore</p>
        </NavLink>
      </section>
      <section className='nav-box'>
        <NavLink
          to='/map'
          className='nav-link'
          onClick={() => {
            dispatch(selectArt(''))
            window.scrollTo(0, 0)
          }}
        >
          <FaMapMarked className='nav-icon' title='map-icon' />
          <p className='nav-text'>map</p>
        </NavLink>
      </section>
      <section className='nav-box'>
        <NavLink
          to='/create'
          className='nav-link'
          onClick={() => {
            dispatch(selectArt(''))
            window.scrollTo(0, 0)
          }}
        >
          <ImCamera className='nav-icon' title='camera-icon' />
          <p className='nav-text'>create</p>
        </NavLink>
      </section>
      <section className='nav-box'>
        <NavLink
          to='/profile'
          className='nav-link'
          onClick={() => {
            dispatch(selectArt(''))
            window.scrollTo(0, 0)
          }}
        >
          <BsFillPersonFill className='nav-icon' title='profile-icon' />
          <p className='nav-text'>profile</p>
        </NavLink>
      </section>
    </footer>
  )
}

export default Nav
