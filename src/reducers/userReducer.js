const initialUserState = {
  name: '',
}

export const user = (state = initialUserState, action) => {
  switch (action.type) {
    case 'LOGIN':
      // should this be ...state instead of user Template
      return { ...initialUserState }
    default:
      return state
  }
}
