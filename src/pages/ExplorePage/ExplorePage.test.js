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
          id: '1',
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
        {
          id: '2',
          latitude: +'39.744137',
          longitude: +'-104.95005',
          address: 'address2',
          city: 'city2',
          state: 'state2',
          zipcode: 'zip2',
          imageUrls: ['url2', 'url1'],
          description: 'test this art',
          artistName: 'artist name2',
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

  it('should render the Explore Page', () => {
    const { getByText, getAllByTestId } = ExplorePageContainer
    const artistName1 = getByText('artist name')
    const artistAddress1 = getByText('address1 city1 state1 zip1')
    const artistDescription1 = getByText('something about this art')
    const artistName2 = getByText('artist name2')
    const artistAddress2 = getByText('address2 city2 state2 zip2')
    const artistDescription2 = getByText('test this art')
    const images = getAllByTestId('art-container')
    expect(artistName1).toBeInTheDocument()
    expect(artistAddress1).toBeInTheDocument()
    expect(artistDescription1).toBeInTheDocument()
    expect(artistName2).toBeInTheDocument()
    expect(artistAddress2).toBeInTheDocument()
    expect(artistDescription2).toBeInTheDocument()
    expect(images).toHaveLength(2)
  })
})
