import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from "@apollo/react-hooks"
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import LoginPage from './LoginPage'
// import ReactDOM from 'react-dom'
// import { MockedProvider } from '@apollo/client/testing';
// import { createStore } from 'redux'
// import rootReducer from '../../reducers/index'
// import { ART_FETCH, LoginPage } from './LoginPage'
// const setIsLoggedIn = jest.fn()

// const mocks = [
//   {
//     request: {
//       query: ART_FETCH,
//       },
//     },{
//     result: {
//       data: {
//         streetArts: [{
//           id: 8,
//           latitude: 39.660355,
//           longitude: -105.598137,
//           address: 'address2',
//           city: 'city2',
//           state: 'state2',
//           zipcode: 'zip2',
//           image_urls: [
//             'https://images.unsplash.com/photo-1526304760382-3591d3840148?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
//             'https://images.unsplash.com/photo-1561059488-916d69792237?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
//             'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1415&q=80',
//           ],
//           description: 'something about this art',
//           artist_name: 'artist name',
//           instagram_handle: 'edignot',
//           favorite: false,
//           visited: true,
//         },
//         {
//           id: 9,
//           latitude: 39.72356,
//           longitude: -104.894882,
//           address: 'address3',
//           city: 'city3',
//           state: 'state3',
//           zipcode: 'zip3',
//           image_urls: [
//             'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1415&q=80',
//             'https://images.unsplash.com/photo-1526304760382-3591d3840148?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
//           ],
//           description: 'something about this art',
//           artist_name: 'artist name',
//           instagram_handle: 'edignot',
//           favorite: true,
//           visited: false,
//         }],
//       },
//     },
//   }
// ];

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
    // store = createStore(rootReducer, initialState)

    client = new ApolloClient({
      uri: 'https://streetwalker-backend.herokuapp.com/graphql',
      cache: new InMemoryCache(),
    })

    LoginPageContainer = render(
      // <MockedProvider mocks={mocks} addTypename={false}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
      // </MockedProvider>
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