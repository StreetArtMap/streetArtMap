const initialArtsState = []

export const arts = (state = initialArtsState, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return [...state, ...action.data]
    case 'TOGGLE_VISITED':
      return state.map((art) => {
        art.id === action.id && (art.visited = !art.visited)
        return art
      })
    case 'TOGGLE_FAVORITE':
      return state.map((art) => {
        art.id === action.id && (art.favorite = !art.favorite)
        return art
      })
    default:
      return state
  }
}
