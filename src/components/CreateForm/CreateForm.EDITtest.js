// import React from 'react'
// import '@testing-library/jest-dom'
// import { render, cleanup } from '@testing-library/react'
// import { BrowserRouter } from 'react-router-dom'
// import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
// import configureStore from 'redux-mock-store'
// import { Provider } from 'react-redux'
// import CameraPage from './CameraPage'

// describe('CameraPage', () => {
//   let CameraPageContainer
//   let store
//   let client
//   let initialState
//   let mockStore

//   beforeEach(() => {
//     initialState = {
//       user: {
//         name: 'edita',
//       },
//       arts: [
//         {
//           id: 1,
//           latitude: +'39.744137',
//           longitude: +'-104.95005',
//           address: 'address1',
//           city: 'city1',
//           state: 'state1',
//           zipcode: 'zip1',
//           imageUrls: ['url2', 'url1'],
//           description: 'something about this art',
//           artistName: 'artist name',
//           instagramHandle: null,
//           favorite: true,
//           visited: false,
//         },
//         {
//           id: 2,
//           latitude: +'39.744137',
//           longitude: +'-104.95005',
//           address: 'address2',
//           city: 'city2',
//           state: 'state2',
//           zipcode: 'zip2',
//           imageUrls: ['url2', 'url1'],
//           description: 'test this art',
//           artistName: 'artist name2',
//           instagramHandle: null,
//           favorite: true,
//           visited: false,
//         },
//       ],
//       session: { selectedArt: '' },
//     }

//     mockStore = configureStore()
//     store = mockStore(initialState)

//     client = new ApolloClient({
//       uri: 'https://streetwalker-backend.herokuapp.com/graphql',
//       cache: new InMemoryCache(),
//     })

//     CameraPageContainer = render(
//       // <ApolloProvider client={client}>
//         // <Provider store={store}>
//           <BrowserRouter>
//             <CameraPage />
//           </BrowserRouter>
//         // </Provider>
//       // </ApolloProvider>
//     )
//   })

//   afterEach(cleanup)

//   it('<CameraPage/> component successfully renders', () => {
//     const { getByText, getAllByRole, getByTestId, debug } = CameraPageContainer
//     debug()
//     const selectBtn = getByText('Select from device')
//     const uploadInput = getByTestId('image-input')
//     const uploadBtn = getByText('Upload Via Widget')
//     const selectButtons = getAllByRole('button')
//     expect(selectBtn).toBeInTheDocument()
//     expect(uploadInput).toBeInTheDocument()
//     expect(uploadBtn).toBeInTheDocument()
//     expect(selectButtons).toHaveLength(2)
//   })
// })