export const initialUserState = {
  name: '',
}

export const user = (state = initialUserState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, name: action.user }
    default:
      return state
  }
}
