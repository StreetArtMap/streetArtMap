import React from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <footer>
      <section className="nav-box">
        <NavLink to='/explore'>explore</NavLink>
      </section>
      <section className="nav-box">
        <NavLink to='/map'>map</NavLink>
      </section>
      <section className="nav-box">
        <NavLink to='/create'>create</NavLink>
      </section>
      <section className="nav-box">
        <NavLink to='/profile'>profile</NavLink>
      </section>
    </footer>
  )
}

export default Nav
