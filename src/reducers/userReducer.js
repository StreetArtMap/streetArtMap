export const initialUserState = {
  name: '',
}

export const user = (state = initialUserState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state }
    default:
      return state
  }
}
