import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../reducers/index'
import { ART_FETCH, LoginPage } from './LoginPage'
const setIsLoggedIn = jest.fn()

const mocks = [
  {
    request: {
      query: ART_FETCH,
      },
    },{
    result: {
      data: {
        streetArts: [{
          id: 8,
          latitude: 39.660355,
          longitude: -105.598137,
          address: 'address2',
          city: 'city2',
          state: 'state2',
          zipcode: 'zip2',
          image_urls: [
            'https://images.unsplash.com/photo-1526304760382-3591d3840148?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1561059488-916d69792237?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
            'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1415&q=80',
          ],
          description: 'something about this art',
          artist_name: 'artist name',
          instagram_handle: 'edignot',
          favorite: false,
          visited: true,
        },
        {
          id: 9,
          latitude: 39.72356,
          longitude: -104.894882,
          address: 'address3',
          city: 'city3',
          state: 'state3',
          zipcode: 'zip3',
          image_urls: [
            'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1415&q=80',
            'https://images.unsplash.com/photo-1526304760382-3591d3840148?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          ],
          description: 'something about this art',
          artist_name: 'artist name',
          instagram_handle: 'edignot',
          favorite: true,
          visited: false,
        }],
      },
    },
  }
  ];

describe('<LoginPage/>', () => {
  let LoginPageContainer
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

    store = createStore(rootReducer, initialState)

    LoginPageContainer = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    )
  })
  afterEach(cleanup)

  // it('should render without crashing', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(LoginPageContainer);
  //   ReactDOM.unmountComponentAtNode(div);
  // })

  // it('should render a login form', () => {
  //   const { getByText, getByPlaceholderText, getByRole } = render(LoginPageContainer)

  //   const title = getByText('Street | ART | Walk')
  //   const usernameInput = getByPlaceholderText('Username...')
  //   const passwordInput = getByPlaceholderText('Password...')
  //   const loginBtn = screen.getByRole('button', { name: /LOG IN/})
  //   const signupBtn = screen.getByRole('button', { name: /SIGN UP/})
  //   expect(title).toBeInTheDocument()
  //   expect(usernameInput).toBeInTheDocument()
  //   expect(passwordInput).toBeInTheDocument()
  //   expect(loginBtn).toBeInTheDocument()
  //   expect(signupBtn).toBeInTheDocument()
  // })
})