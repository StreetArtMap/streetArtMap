import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from "@apollo/react-hooks"
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import LoginPage from './LoginPage'

describe('<LoginPage/>', () => {
  let LoginPageContainer
  let store
  let initialState
  let mockStore
  let client

  beforeEach(() => {
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
          image_urls: ['url2', 'url1'],
          description: 'something about this art',
          artist_name: 'artist name',
          instagram_handle: null,
          favorite: true,
          visited: false,
        },
      ],
    }
    mockStore = configureStore()
    store = mockStore(initialState)
    client = new ApolloClient({
      uri: 'https://streetwalker-backend.herokuapp.com/graphql',
      cache: new InMemoryCache(),
    })

    LoginPageContainer = render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
  })
  afterEach(cleanup)

  it('should render a login form', () => {
    const { getByText, getByPlaceholderText, getByTestId } = LoginPageContainer
    const title = getByText('Street | ART | Walk')
    const usernameInput = getByPlaceholderText('Username...')
    const passwordInput = getByPlaceholderText('Password...')
    const loginBtn = getByText('LOG IN')
    const signupBtn = getByText('SIGN UP')
    const signupMessage = getByTestId('signup-message')
    expect(title).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginBtn).toBeInTheDocument()
    expect(signupBtn).toBeInTheDocument()
    expect(signupMessage).toBeInTheDocument()
  })
})