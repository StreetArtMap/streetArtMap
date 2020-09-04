import React from 'react'
import Nav from '../../containers/Nav/Nav'
import Header from '../Header/Header'

const Layout = ({ children }) => {
  return (
    <section>
      <Header />
      {children}
      <Nav />
    </section>
  )
}

export default Layout
