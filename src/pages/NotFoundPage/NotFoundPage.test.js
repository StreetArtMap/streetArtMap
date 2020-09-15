import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'

describe('ProfilePage', () => {
  let NotFoundPageContainer
  beforeEach(() => {
    NotFoundPageContainer = render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
      )
  })
  it('<ProfilePage/> component successfully renders', () => {
    const { getByTestId } = NotFoundPageContainer
    const notFoundMessage = getByTestId('not-found-message')
    expect(notFoundMessage).toBeInTheDocument()
  })
})
