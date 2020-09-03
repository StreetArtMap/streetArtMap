const userTemplate = {
  name: '',
}

export const user = (state = userTemplate, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...userTemplate, ...action.user }
    default:
      return state
  }
}
