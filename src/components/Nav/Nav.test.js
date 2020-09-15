import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from "@apollo/react-hooks"
import configureStore from 'redux-mock-store'
import Nav from './Nav'

describe('NavP', () => {
  let NavBox, store, initialState, mockStore, client, art
  beforeEach(() => {
    client = new ApolloClient({
      uri: 'https://streetwalker-backend.herokuapp.com/graphql',
      cache: new InMemoryCache(),
    })

    initialState = {
      user: {
        name: 'edita',
      },
      arts: [
        {
          id: 1,
          latitude: 39.744137,
          longitude: -104.95005,
          address: 'address1',
          city: 'city1',
          state: 'state1',
          zipcode: 'zip1',
          images: ['url2', 'url1'],
          description: 'something about this art',
          artist_name: 'artist name',
          instagram_handle: null,
          favorite: true,
          visited: false,
        },
        {
          id: '2',
          latitude: +'39.744137',
          longitude: +'-104.95005',
          address: 'address2',
          city: 'city2',
          state: 'state2',
          zipcode: 'zip2',
          images: ['url2', 'url1'],
          description: 'test this art',
          artistName: 'artist name2',
          instagramHandle: null,
          favorite: true,
          visited: false,
        },
      ],
    }
    art =  {
      id: '2',
      latitude: +'39.744137',
      longitude: +'-104.95005',
      address: 'address2',
      city: 'city2',
      state: 'state2',
      zipcode: 'zip2',
      images: ['https://res.cloudinary.com/ds6dxgvxo/image/upload/v1600116891/ldxpxerqishozdxuvpzp.jpg', 'https://res.cloudinary.com/ds6dxgvxo/image/upload/v1600116891/ldxpxerqishozdxuvpzp.jpg'],
      description: 'test this art',
      artistName: 'artist name2',
      instagramHandle: null,
      favorite: true,
      visited: false,
    }
    mockStore = configureStore()
    store = mockStore(initialState)

    NavBox = render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <Nav art={art}/>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
      )
  })
  it('<Nav /> component successfully renders', () => {
    const { getByTitle } = NavBox
    const searchIcon = getByTitle('search-icon')
    const mapIcon = getByTitle('map-icon')
    const cameraIcon = getByTitle('camera-icon')
    const profileIcon = getByTitle('profile-icon')
    expect(searchIcon).toBeInTheDocument()
    expect(mapIcon).toBeInTheDocument()
    expect(cameraIcon).toBeInTheDocument()
    expect(profileIcon).toBeInTheDocument()
  })
})
