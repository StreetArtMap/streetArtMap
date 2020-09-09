const initialArtsState = []

export const arts = (state = initialArtsState, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return [...state, ...action.data]
    default:
      return state
  }
}
