const initialSessionState = {
  selectedArt: '',
}

export const session = (state = initialSessionState, action) => {
  switch (action.type) {
    case 'SELECT_ART':
      return { ...state, selectedArt: action.id }
    default:
      return state
  }
}
