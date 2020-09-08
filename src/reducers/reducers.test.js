import '@testing-library/jest-dom'
import { arts } from './artsReducer'
import { user } from './userReducer'

describe('Reducers', () => {
  let arts1, user1, initialArtsState, initialUserState;
  beforeEach(() => {
    initialArtsState = []
    initialUserState = {
      name: '',
    }
    arts1 = [{
      id: 8,
      latitude: +'39.660355',
      longitude: +'-105.598137',
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
      latitude: +'39.72356',
      longitude: +'-104.894882',
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
    }]
    user1 = {
      name: 'Sancho'
    }
  })

  it('should set initial state for user', () => {
    const currentUserState = user(initialUserState, '')
    expect(currentUserState.name).toEqual('')
  })

  it('should set new user', () => {
    const currentState = user(user1, {})
    expect(currentState.name).toEqual('Sancho')
  })

  it('should set initial state of isAuthenticated', () => {
    const currentState = arts(initialArtsState, [])
    expect(currentState).toHaveLength(0)
  })

  it('should set arts array', () => {
    const currentState = arts(arts1, 'ADD DATA')
    expect(currentState).toHaveLength(2)
  })
})