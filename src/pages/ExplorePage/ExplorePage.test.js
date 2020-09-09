import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import ExplorePage from './ExplorePage'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../../reducers/index'
import Nav from '../../components/Nav/Nav'

describe('ProfilePage', () => {
  let ExplorePageContainer
  let store
  let initialState

  beforeEach(() => {
    initialState = {
      user: {
        name: 'edita',
      },
      arts: [
        {
          id: 1,
          latitude: +'39.744137',
          longitude: +'-104.95005',
          address: 'address1',
          city: 'city1',
          state: 'state1',
          zipcode: 'zip1',
          image_urls: ['url2', 'url1'],
          description: 'something about this art',
          artistName: 'artist name',
          instagram_handle: null,
          favorite: true,
          visited: false,
        },
      ],
    }

    store = createStore(rootReducer, initialState)

    ExplorePageContainer = render(
      <Provider store={store}>
        <BrowserRouter>
          <ExplorePage />
        </BrowserRouter>
      </Provider>
    )
  })

  afterEach(cleanup)

  it('<ExplorePage/> component successfully renders', () => {
    const { getByTestId, getByText } = ExplorePageContainer
    expect(getByText('artist name')).toBeInTheDocument()
  })

  it('should render the nav', () => {
    const { getByText, getByTitle } = render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    )

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
