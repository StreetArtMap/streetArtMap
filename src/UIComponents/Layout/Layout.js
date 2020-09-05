import React from 'react'
import Nav from '../../components/Nav/Nav'
import Header from '../Header/Header'

const Layout = ({ children }) => {
  return (
    <section className="layout-container">
      <Header />
      {children}
      <Nav />
    </section>
  )
}

export default Layout
