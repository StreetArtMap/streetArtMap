import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Nav from './Nav'

describe('ProfilePage', () => {
  afterEach(cleanup)

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should render the nav', () => {
    const { getByText, getByTitle } = render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>)

    const explore = getByText('explore')
    const map = getByText('map')
    const create = getByText('create')
    const profile = getByText('profile')
    const searchIcon = getByTitle('search-icon')
    const mapIcon = getByTitle('map-icon')
    const cameraIcon = getByTitle('camera-icon')
    const profileIcon = getByTitle('profile-icon')
    expect(explore).toBeInTheDocument()
    expect(map).toBeInTheDocument()
    expect(create).toBeInTheDocument()
    expect(profile).toBeInTheDocument()
    expect(searchIcon).toBeInTheDocument()
    expect(mapIcon).toBeInTheDocument()
    expect(cameraIcon).toBeInTheDocument()
    expect(profileIcon).toBeInTheDocument()
  })
})