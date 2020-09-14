import React from 'react'
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ExplorePage from './ExplorePage'

describe('ExplorePage', () => {
  let ExplorePageContainer
  let store
  let client
  let initialState
  let mockStore

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
          imageUrls: ['url2', 'url1'],
          description: 'something about this art',
          artistName: 'artist name',
          instagramHandle: null,
          favorite: true,
          visited: false,
        },
      ],
      session: { selectedArt: '' },
    }

    mockStore = configureStore()
    store = mockStore(initialState)

    client = new ApolloClient({
      uri: 'https://streetwalker-backend.herokuapp.com/graphql',
      cache: new InMemoryCache(),
    })

    ExplorePageContainer = render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <ExplorePage />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
  })

  afterEach(cleanup)

  it('<ExplorePage/> component successfully renders', () => {
    const { getByText } = ExplorePageContainer
    expect(getByText('artist name')).toBeInTheDocument()
  })

  // it('should render the nav', () => {
  //   const { getByText, getByTitle } = render(
  //     <BrowserRouter>
  //       <Nav />
  //     </BrowserRouter>
  //   )

  //   const explore = getByText('explore')
  //   const map = getByText('map')
  //   const create = getByText('create')
  //   const profile = getByText('profile')
  //   const searchIcon = getByTitle('search-icon')
  //   const mapIcon = getByTitle('map-icon')
  //   const cameraIcon = getByTitle('camera-icon')
  //   const profileIcon = getByTitle('profile-icon')
  //   expect(explore).toBeInTheDocument()
  //   expect(map).toBeInTheDocument()
  //   expect(create).toBeInTheDocument()
  //   expect(profile).toBeInTheDocument()
  //   expect(searchIcon).toBeInTheDocument()
  //   expect(mapIcon).toBeInTheDocument()
  //   expect(cameraIcon).toBeInTheDocument()
  //   expect(profileIcon).toBeInTheDocument()
  // })
})
