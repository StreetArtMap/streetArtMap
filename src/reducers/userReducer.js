const userTemplate = {
  name: '',
}

export const user = (state = userTemplate, action) => {
  switch (action.type) {
    case 'LOGIN':
      // should this be ...state instead of user Template
      return { ...userTemplate, ...action.user }
    default:
      return state
  }
}
