import '@testing-library/jest-dom'
import { arts } from './artsReducer'
import { user } from './userReducer'
import { session } from './sessionReducer'


describe('Reducers', () => {
  let arts1,
    user1,
    session1,
    initialArtsState,
    initialUserState,
    initialSessionState
  beforeEach(() => {
    initialArtsState = []
    initialUserState = {
      name: '',
    }
    initialSessionState = {
      selectArt: '',
    }
    arts1 = [
      {
        id: '8',
        latitude: +'39.660355',
        longitude: +'-105.598137',
        address: 'address2',
        city: 'city2',
        state: 'state2',
        zipcode: 'zip2',
        images: ['url1', 'url2', 'url3'],
        description: 'something about this art',
        artist_name: 'artist name',
        instagramHandle: 'instagram',
        favorite: false,
        visited: true,
      },
      {
        id: '9',
        latitude: +'39.72356',
        longitude: +'-104.894882',
        address: 'address3',
        city: 'city3',
        state: 'state3',
        zipcode: 'zip3',
        images: ['url4', 'url5'],
        description: 'something about this art',
        artist_name: 'artist name',
        instagramHandle: 'instagram',
        favorite: true,
        visited: false,
      },
    ]
    user1 = {
      name: 'Sancho',
    }
    session1 = {
      selectArt: '8',
    }
  })

  it('should return user state with updated login info', () => {
    const action = {
      type: 'LOGIN',
      user: user1.name,
    }
    const result = user(initialUserState, action)
    expect(result).toEqual(user1)
  })

  it('should return arts state with added arts', () => {
    const action = {
      type: 'ADD_DATA',
      data: arts1,
    }
    const result = arts(initialArtsState, action)
    expect(result).toEqual(arts1)
  })

  it('should return arts state with updated toggle visited', () => {
    const action = {
      type: 'TOGGLE_VISITED',
      id: arts1[0].id,
    }
    const result = arts(arts1, action)
    expect(result).toEqual([{ ...arts1[0], visited: false }, arts1[1]])
  })

  it('should return arts state with updated toggle favorite', () => {
    const action = {
      type: 'TOGGLE_FAVORITE',
      id: arts1[0].id,
    }
    const result = arts(arts1, action)
    expect(result).toEqual([{ ...arts1[0], visited: true }, arts1[1]])
  })

  it('should return session state with updated selected art id', () => {
    const action = {
      type: 'SELECT_ART',
      id: session1.selectArt,
    }
    const result = session(initialSessionState, action)
    expect(result).toEqual({ ...initialSessionState, selectedArt: '8' })
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
