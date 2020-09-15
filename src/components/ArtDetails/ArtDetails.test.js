import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import configureStore from 'redux-mock-store'
import ArtDetails from './ArtDetails'

describe('ArtDetailsPage', () => {
  window.scrollTo = jest.fn()
  let ArtDetailsBox, store, initialState, mockStore, client, art
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
      ],
    }
    art = {
      id: '2',
      latitude: +'39.744137',
      longitude: +'-104.95005',
      address: 'address2',
      city: 'city2',
      state: 'state2',
      zipcode: 'zip2',
      images: [
        'https://res.cloudinary.com/ds6dxgvxo/image/upload/v1600116891/ldxpxerqishozdxuvpzp.jpg',
        'https://res.cloudinary.com/ds6dxgvxo/image/upload/v1600116891/ldxpxerqishozdxuvpzp.jpg',
      ],
      description: 'test this art',
      artistName: 'artist name2',
      instagramHandle: null,
      favorite: true,
      visited: false,
    }
    mockStore = configureStore()
    store = mockStore(initialState)

    ArtDetailsBox = render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <ArtDetails art={art} />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
  })
  it('<ArtDetails /> component successfully renders', () => {
    const { getByTestId, getByText } = ArtDetailsBox
    const favoriteIcon = getByTestId('favorite-icon')
    const visitedIcon = getByTestId('visited-icon')
    const artistName = getByText('artist name2')
    const artistAddress = getByText('address2 city2 state2 zip2')
    const artDescription = getByText('test this art')
    expect(favoriteIcon).toBeInTheDocument()
    expect(visitedIcon).toBeInTheDocument()
    expect(artistName).toBeInTheDocument()
    expect(artistAddress).toBeInTheDocument()
    expect(artDescription).toBeInTheDocument()
  })

  it('<ArtDetails /> component successfully renders', () => {
    const { getByTestId, getByText, debug } = ArtDetailsBox
    const favoriteIcon = getByTestId('favorite-icon')
    fireEvent.click(favoriteIcon)
    debug()
  })
})
