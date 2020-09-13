import * as actions from './actions'

describe('actions', () => {
  let data, id, user

  beforeEach(() => {
    data = [
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
    user = 'Sancho'
    id = '1'
  })

  it('should have a type LOGIN', () => {
    const action = {
      type: 'LOGIN',
      user,
    }
    const result = actions.login(user)
    expect(result).toEqual(action)
  })

  it('should have a type ADD_DATA', () => {
    const action = {
      type: 'ADD_DATA',
      data,
    }
    const result = actions.addData(data)
    expect(result).toEqual(action)
  })

  it('should have a type SELECT_ART', () => {
    const action = {
      type: 'SELECT_ART',
      id,
    }
    const result = actions.selectArt(id)
    expect(result).toEqual(action)
  })

  it('should have a type TOGGLE_FAVORITE', () => {
    const action = {
      type: 'TOGGLE_FAVORITE',
      id,
    }
    const result = actions.toggleFavorite(id)
    expect(result).toEqual(action)
  })

  it('should have a type TOGGLE_VISITED', () => {
    const action = {
      type: 'TOGGLE_VISITED',
      id,
    }
    const result = actions.toggleVisited(id)
    expect(result).toEqual(action)
  })
})
