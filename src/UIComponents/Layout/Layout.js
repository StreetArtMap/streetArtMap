import React from 'react'
import Nav from '../../components/Nav/Nav'
import Header from '../Header/Header'

const Layout = ({ children, isLoggedIn }) => {
  return (
    <section className="layout-container">
      {isLoggedIn && <Header />}
      {children}
      {isLoggedIn && <Nav />}
    </section>
  )
}

export default Layout
