import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import ProfilePage from './ProfilePage'

describe('ProfilePage', () => {
  afterEach(cleanup)

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should render the profile page', () => {
    const { getByText, getByTitle, getAllByRole } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>)

    const userName = getByText('UserName Here')
    const savedImages = getByText('10 Images Saved')
    const postsInformation = getByText('55 Posts')
    const images = getAllByRole('img')
    const collectionBtn = getByTitle('collection-icon')
    const bookmarkBtn = getByTitle('bookmark-icon')
    expect(userName).toBeInTheDocument()
    expect(savedImages).toBeInTheDocument()
    expect(postsInformation).toBeInTheDocument()
    expect(images).toHaveLength(8)
    expect(collectionBtn).toBeInTheDocument()
    expect(bookmarkBtn).toBeInTheDocument()
  })
})