import React from 'react'
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import CreateForm from './CreateForm'

describe('CreateForm', () => {
  let CreateFormContainer
  let store
  let client
  let initialState
  let mockStore
  let setIsLoggedIn

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
        {
          id: 2,
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
    setIsLoggedIn = jest.fn()

    client = new ApolloClient({
      uri: 'https://streetwalker-backend.herokuapp.com/graphql',
      cache: new InMemoryCache(),
    })

    CreateFormContainer = render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm setIsLoggedIn={setIsLoggedIn} images={initialState.arts}/>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
  })

  afterEach(cleanup)

  it('<CreateForm/> component successfully renders', () => {
    const { getAllByTestId, getByTestId } = CreateFormContainer
    const images = getAllByTestId('image')
    const form = getByTestId('image-form')
    const titleInput = getByTestId('title-input')
    const nameInput = getByTestId('name-input')
    const description = getByTestId('description')
    const instagram = getByTestId('instagram-input')
    const address = getByTestId('address')
    const city = getByTestId('city')
    const state = getByTestId('state')
    const zipcode = getByTestId('zipcode')
    const locationBtn = getByTestId('my-location-button')
    const postArt = getByTestId('post-art-icon')
    expect(images).toHaveLength(2)
    expect(form).toBeInTheDocument()
    expect(titleInput).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(instagram).toBeInTheDocument()
    expect(address).toBeInTheDocument()
    expect(city).toBeInTheDocument()
    expect(state).toBeInTheDocument()
    expect(zipcode).toBeInTheDocument()
    expect(locationBtn).toBeInTheDocument()
    expect(postArt).toBeInTheDocument()
  })
})