import React from 'react'
import '@testing-library/jest-dom'
import ReactDOM from 'react-dom'
import { render, cleanup, screen } from '@testing-library/react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
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
        name: 'user',
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
          artName: 'art name',
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

    ProfilePageContainer = render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            {/* <ProfilePage /> */}
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
  })

  afterEach(cleanup)

  it('fake test', () => {
    expect(true).toBeTruthy()
  })

  // it('<ProfilePage/> component successfully renders', () => {
  //   const { getByText } = ProfilePageContainer
  //   expect(getByText('user')).toBeInTheDocument()
  // })

  // it('should render without crashing', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(
  //     <BrowserRouter>
  //       <ProfilePage />
  //     </BrowserRouter>, div);
  //   ReactDOM.unmountComponentAtNode(div);
  // })

  // it('should render the profile page', () => {
  //   const { getByText, getByTitle, getAllByRole } = ProfilePageContainer

  //   const userName = getByText('UserName Here')
  //   const savedImages = getByText('10 Images Saved')
  //   const postsInformation = getByText('55 Posts')
  //   const images = getAllByRole('img')
  //   const collectionBtn = getByTitle('collection-icon')
  //   const bookmarkBtn = getByTitle('bookmark-icon')
  //   expect(userName).toBeInTheDocument()
  //   expect(savedImages).toBeInTheDocument()
  //   expect(postsInformation).toBeInTheDocument()
  //   expect(images).toHaveLength(8)
  //   expect(collectionBtn).toBeInTheDocument()
  //   expect(bookmarkBtn).toBeInTheDocument()
  // })
})
