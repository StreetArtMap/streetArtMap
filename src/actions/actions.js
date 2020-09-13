export const login = (user) => ({
  type: 'LOGIN',
  user,
})

export const addData = (data) => ({
  type: 'ADD_DATA',
  data,
})

export const selectArt = (id) => ({
  type: 'SELECT_ART',
  id,
})

export const toggleFavorite = (id) => ({
  type: 'TOGGLE_FAVORITE',
  id,
})

export const toggleVisited = (id) => ({
  type: 'TOGGLE_VISITED',
  id,
})
