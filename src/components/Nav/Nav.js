import React from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaMapMarked, FaSearch } from 'react-icons/fa'
import { ImCamera } from 'react-icons/im'

const Nav = () => {
  return (
    <footer>
      <section className='nav-box'>
        <NavLink to='/explore' className='nav-link'>
          <FaSearch className='nav-icon' />
          <p className='nav-text'>explore</p>
        </NavLink>
      </section>
      <section className='nav-box'>
        <NavLink to='/map' className='nav-link'>
          <FaMapMarked className='nav-icon' />
          <p className='nav-text'>map</p>
        </NavLink>
      </section>
      <section className='nav-box'>
        <NavLink to='/create' className='nav-link'>
          <ImCamera className='nav-icon' />
          <p className='nav-text'>create</p>
        </NavLink>
      </section>
      <section className='nav-box'>
        <NavLink to='/profile' className='nav-link'>
          <BsFillPersonFill className='nav-icon' />
          <p className='nav-text'>profile</p>
        </NavLink>
      </section>
    </footer>
  )
}

export default Nav
