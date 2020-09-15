import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from "@apollo/react-hooks"
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ProfilePage from './ProfilePage'

describe('ProfilePage', () => {
  let ProfilePageContainer
  let store
  let client
  let initialState
  let mockStore

  beforeEach(() => {
    initialState = {
      user: {
        name: 'test username',
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
          images: ['url2', 'url1'],
          description: 'something about this art',
          artistName: 'artist name',
          artName: 'art name',
          instagramHandle: null,
          favorite: true,
          visited: false,
        }
      ],
      session: { selectedArt: '' },
    }

    mockStore = configureStore()
    store = mockStore(initialState)

    client = new ApolloClient({
      uri: 'https://streetwalker-backend.herokuapp.com/graphql',
      cache: new InMemoryCache(),
    })
    
    ProfilePageContainer = render(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
              <ProfilePage />
            </BrowserRouter>
          </Provider>
        </ApolloProvider>
      )
  })
  it('<ProfilePage/> component successfully renders', () => {
    const { getByText, getByTestId } = ProfilePageContainer
    const userName = getByText('test username')
    const postAmount = getByText('1 Posts')
    const collectionBtn = getByTestId('collection-icon')
    const bookmarkBtn = getByTestId('bookmark-icon')
    const toursBtn = getByTestId('tours-icon')
    const popUp = getByText('Curated Walking Tours')
    const popUpBtn = getByText('back')
    expect(userName).toBeInTheDocument()
    expect(postAmount).toBeInTheDocument()
    expect(collectionBtn).toBeInTheDocument()
    expect(bookmarkBtn).toBeInTheDocument()
    expect(toursBtn).toBeInTheDocument()
    expect(popUp).toBeInTheDocument()
    expect(popUpBtn).toBeInTheDocument()
  })
})

