import React from 'react'
import './NotFoundPage.css'

const NotFoundPage = () => {
  return (
    <section className='not-found-container'>
      <h2 className='not-found-message'  data-testid="not-found-message">
        You found the page that doesn't exist...
      </h2>
    </section>
  )
}

export default NotFoundPage
