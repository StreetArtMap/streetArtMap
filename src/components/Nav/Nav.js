import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/explore'>explore</NavLink>
        </li>
        <li>
          <NavLink to='/map'>map</NavLink>
        </li>
        <li>
          <NavLink to='/create'>create</NavLink>
        </li>
        <li>
          <NavLink to='/profile'>profile</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
