import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>explore</NavLink>
        </li>
        <li>
          <NavLink to='/'>map</NavLink>
        </li>
        <li>
          <NavLink to='/'>add</NavLink>
        </li>
        <li>
          <NavLink to='/'>profile</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
